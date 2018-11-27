import React from 'react';
import classNames from 'classnames';

const Form = ({children, onSubmit, className}) => {
    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (onSubmit) {
            onSubmit(event);
        }
    };

    return (
        <form onSubmit={handleFormSubmit} className={classNames(
            "Form",
            className,
        )}>
            {children}
        </form>
    )
};

export default Form;
