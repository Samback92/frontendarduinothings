import React, { useEffect, useState } from 'react';


interface Measurement {
    id: string;
    temperature: number;
    humidity: number;
    timestamp: string;
}

const Measurements: React.FC = () => {
    const [measurements, setMeasurements] = useState<Measurement[]>([]);
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://shark-app-7cyvy.ondigitalocean.app/get-data');
                const data = await response.json();
                setMeasurements(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
  
        fetchData();
    }, []);

    const handleDelete = (dataId: string) => {
        fetch(`https://shark-app-7cyvy.ondigitalocean.app/${dataId}`, {
            method: 'DELETE',
        })
        .then(res => {
            if (res.ok) {
                setMeasurements(measurements.filter(measurement => measurement.id !== dataId));
            } else {
                console.error('Failed to delete task');
            }
        });
    };
  
    return (
        <>
            <div>
                <h1>Measurements</h1>
                <div>
                {measurements.map(measurement => (
                    <div id='dataDiv' key={measurement.id}>
                        <div>
                            <p>Timestamp: {new Date(measurement.timestamp).toLocaleString()}</p>
                            <p>Temperature: {measurement.temperature}°C</p>
                            <p>Humidity: {measurement.humidity}%</p>
                        </div>
                        <button onClick={() => handleDelete(measurement.id)}>Delete</button>
                    </div>
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