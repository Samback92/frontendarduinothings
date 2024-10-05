import React from 'react';
import styles from '../styling/Statistics.module.css';
import { Measurement } from '../types';

interface StatisticsProps {
    measurements: Measurement[];
}

const Statistics: React.FC<StatisticsProps> = ({ measurements }) => {
    if (measurements.length === 0) {
        return <p>No measurements available for selected period.</p>;
    }

    const averageTemperature = measurements.reduce((sum, m) => sum + m.temperature, 0) / measurements.length;
    const averageHumidity = measurements.reduce((sum, m) => sum + m.humidity, 0) / measurements.length;
    const maxTemperature = Math.max(...measurements.map(m => m.temperature));
    const maxHumidity = Math.max(...measurements.map(m => m.humidity));


    return (
        <div className={styles.statsDiv}>
            <h2>Statistics</h2>
            <p>Highest temperature: {maxTemperature.toFixed(2)} °C</p>
            <p>Average temperature: {averageTemperature.toFixed(2)} °C</p>
            <p>Highest humidity:    {maxHumidity.toFixed(2)} %</p>
            <p>Average humidity:    {averageHumidity.toFixed(2)} %</p>
            <p>Number of measurements: {measurements.length}</p>
        </div>
    );
};

export default Statistics;
