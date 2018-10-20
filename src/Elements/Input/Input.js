import React from 'react';

const Form = ({children, value, field, label}) => {
    return (
        <div className="InputWrapper">
            {!!label && <span className="InputLabel">{label}</span>}
            <input type="text" className="Input" id={field} name={field} value={value}/>
        </div>
    )
};

export default Form;
