import React from 'react';

const SelectController = (props) => {
    const { label, id, onChange, value, name, options } = props;

    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{ label }</label>
            <select className="form-select form-select-sm" value={value} onChange={onChange} name={name} aria-label={id}>
                <option defaultValue>Select options</option>
                {
                    options.map( option => (
                        <option key={option.id} value={option.id}>{option.name || option.first_name + " " + option.last_name }</option>
                    ))
                }
            </select>
        </div>
    );
};

export default SelectController;
