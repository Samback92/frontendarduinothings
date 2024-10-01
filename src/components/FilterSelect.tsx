import React from 'react';

interface FilterSelectProps {
    filter: string;
    onFilterChange: (filter: string) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ filter, onFilterChange }) => {
    return (
        <select onChange={(e) => onFilterChange(e.target.value)} value={filter}>
            <option value="">All readings</option>
            <option value="today">Readings today</option>
            <option value="yesterday">Readings yesterday</option>
            <option value="2days">2 days ago</option>
            <option value="3days">3 days ago</option>
            <option value="4days">4 days ago</option>
            <option value="5days">5 days ago</option>
            <option value="6days">6 days ago</option>
            <option value="1week">1 week ago</option>
        </select>
    );
};

export default FilterSelect;
