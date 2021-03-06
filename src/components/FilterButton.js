import React from 'react';

const FilterButton = ({name, pressed}) => (
    <button type="button" className="btn toggle-btn" aria-pressed={pressed}>
        <span className="visually-hidden">Show </span>
        <span>{name}</span>
        <span className="visually-hidden"> tasks</span>
    </button>
);
export default FilterButton;