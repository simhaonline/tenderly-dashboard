import React from 'react';
import classNames from 'classnames';

import './Input.css';

const Input = ({children, value, type, field, label, onChange}) => {
    const handleInputChange = (event) => {
        const newValue = event.target.value;

        if (onChange && field) {
            onChange(field, newValue, event)
        }
    };

    const labelStateClassName = value ? 'focused' : '';

    return (
        <div className="InputWrapper">
            {!!label && <label htmlFor={`input-${field}`} className={
                classNames(
                    "InputLabel",
                    labelStateClassName,
                )}>{label}</label>
            }
            <input type={type || "text"} className="Input" id={`input-${field}`} name={field} value={value} onChange={handleInputChange}/>
        </div>
    )
};

export default Input;
