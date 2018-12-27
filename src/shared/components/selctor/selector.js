import React from 'react';

const Selector = props => {
    const { className, defaultValue, data, onChange, disabled } = props;
    return (
        <select
            className={className}
            defaultValue={defaultValue}
            onChange={onChange}
        >
            <option disabled={disabled}>{defaultValue}</option>
            {data.map((el, i) => <option key={i}>{el}</option>)}
        </select>
    );
};

export default Selector;
