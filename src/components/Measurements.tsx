import React, { useEffect, useState } from 'react';
import { fetchData, deleteData } from '../services/api';
import { isSameDay, getDaysAgo } from '../services/dateUtils';
import MeasurementItem from './MeasurementItem';
import FilterSelect from './FilterSelect';
import Statistics from './Statistics';
import { Measurement } from "../types";


const Measurements: React.FC = () => {
    const [measurements, setMeasurements] = useState<Measurement[]>([]);
    const [filter, setFilter] = useState<string>("today");
    const [filteredMeasurements, setFilteredMeasurements] = useState<Measurement[]>([]);
    

    useEffect(() => {
        const loadMeasurements = async () => {
            try {
                // const response = await fetch('http://localhost:8080/get-data');
                const data = await fetchData<Measurement[]>('/get-data');
                setMeasurements(data);
                filterMeasurements(data, 'today');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
  
        loadMeasurements();
    }, []);

    const handleDelete = async (dataId: string) => {
        try {
            // fetch(`http://localhost:8080/${dataId}`
            await deleteData(`/${dataId}`);
            const updatedMeasurements = measurements.filter(measurement => measurement.id !== dataId);
            setMeasurements(updatedMeasurements);
            filterMeasurements(updatedMeasurements, filter);
        } catch (error) {
            console.error('Failed to delete task', error);
        }
    };

    const filterMeasurements = (data: Measurement[], filter: string) => {
        const now = new Date();
        let filteredData = data;

        switch (filter) {
            case 'all':
                filteredData = data;
                break;
            case 'today':
                filteredData = data.filter(measurement => isSameDay(new Date(measurement.timestamp), now));
                break;
            case 'yesterday':
                filteredData = data.filter(measurement => isSameDay(new Date(measurement.timestamp), getDaysAgo(1)));
                break;
            case '2days':
                filteredData = data.filter(measurement => isSameDay(new Date(measurement.timestamp), getDaysAgo(2)));
                break;
            case '3days':
                filteredData = data.filter(measurement => isSameDay(new Date(measurement.timestamp), getDaysAgo(3)));
                break;
            case '4days':
                filteredData = data.filter(measurement => isSameDay(new Date(measurement.timestamp), getDaysAgo(4)));
                break;
            case '5days':
                filteredData = data.filter(measurement => isSameDay(new Date(measurement.timestamp), getDaysAgo(5)));
                break;
            case '6days':
                filteredData = data.filter(measurement => isSameDay(new Date(measurement.timestamp), getDaysAgo(6)));
                break;
            case '1week':
                filteredData = data.filter(measurement => isSameDay(new Date(measurement.timestamp), getDaysAgo(7)));
                break;
            default:
                break;
        }

        setFilteredMeasurements(filteredData.reverse());
    };

    const handleFilterChange = (selectedFilter: string) => {
        setFilter(selectedFilter);
        filterMeasurements(measurements, selectedFilter);
    };
  

    return (
        <>
            <div>
                <h1>Measurements</h1>
                <h2>from sensor DHT11</h2>
                <div>
                    <p>Filter the list by :</p>
                    <FilterSelect filter={filter} onFilterChange={handleFilterChange} />   
                </div>
                <div>
                    <Statistics measurements={filteredMeasurements} />
                </div>
                <div>
                    {filteredMeasurements.map(measurement => (
                        <MeasurementItem key={measurement.id} measurement={measurement} onDelete={handleDelete} />
                    ))}
                </div>
            </div>
        </>
    );
};
  
export default Measurements;