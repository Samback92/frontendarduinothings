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
  
    return (
      <div>
        <h1>Measurements</h1>
        <ul>
          {measurements.map(measurement => (
            <li key={measurement.id}>
              <p>Temperature: {measurement.temperature}°C</p>
              <p>Humidity: {measurement.humidity}%</p>
              <p>Timestamp: {new Date(measurement.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Measurements;