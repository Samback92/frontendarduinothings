import React from 'react';
import { Measurement } from "../types";

interface MeasurementItemProps {
    measurement: Measurement;
    onDelete: (id: string) => void;
}

const MeasurementItem: React.FC<MeasurementItemProps> = ({ measurement, onDelete }) => (
    <div id='dataDiv' key={measurement.id}>
        <div>
            <p>Timestamp: {new Date(measurement.timestamp).toLocaleString()}</p>
            <p>Temperature: {measurement.temperature}°C</p>
            <p>Humidity: {measurement.humidity}%</p>
        </div>
        <button onClick={() => onDelete(measurement.id)}>Delete</button>
    </div>
);

export default MeasurementItem;
