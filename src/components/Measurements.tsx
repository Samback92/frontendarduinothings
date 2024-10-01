import React, { useEffect, useState } from 'react';
import { fetchData, deleteData } from '../services/api';
import MeasurementItem from './MeasurementItem';
import { Measurement } from "../types";


const Measurements: React.FC = () => {
    const [measurements, setMeasurements] = useState<Measurement[]>([]);
  
    useEffect(() => {
        const loadMeasurements = async () => {
            try {
                // const response = await fetch('http://localhost:8080/get-data');
                const data = await fetchData<Measurement[]>('https://shark-app-7cyvy.ondigitalocean.app/get-data');
                setMeasurements(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
  
        loadMeasurements();
    }, []);

    const handleDelete = async (dataId: string) => {
        try {
            // fetch(`http://localhost:8080/${dataId}`
            await deleteData(`https://shark-app-7cyvy.ondigitalocean.app/${dataId}`);
            setMeasurements(measurements.filter(measurement => measurement.id !== dataId));
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };
  

    return (
        <>
            <div>
                <h1>Measurements</h1>
                <div>
                    {measurements.map(measurement => (
                        <MeasurementItem key={measurement.id} measurement={measurement} onDelete={handleDelete} />
                    ))}
                </div>
            </div>
            <div>
                <h1>Add a new measurement</h1>
            </div>
        </>
    );
};
  
export default Measurements;