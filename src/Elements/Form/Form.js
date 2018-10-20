import React from 'react';

const Form = ({children, onSubmit}) => {
    return (
        <div className="Form">
            {children}
        </div>
    )
};

export default Form;
