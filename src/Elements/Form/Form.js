import React from 'react';

const Form = ({children, onSubmit}) => {
    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (onSubmit) {
            onSubmit(event);
        }
    };

    return (
        <form onSubmit={handleFormSubmit} className="Form">
            {children}
        </form>
    )
};

export default Form;
