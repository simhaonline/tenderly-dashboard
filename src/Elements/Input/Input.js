import React from 'react';

const Input = ({children, value, field, label, onChange}) => {
    const handleInputChange = (event) => {
        const newValue = event.target.value;

        if (onChange && field) {
            onChange(field, newValue, event)
        }
    };

    return (
        <div className="InputWrapper">
            {!!label && <span className="InputLabel">{label}</span>}
            <input type="text" className="Input" id={field} name={field} value={value} onChange={handleInputChange}/>
        </div>
    )
};

export default Input;
