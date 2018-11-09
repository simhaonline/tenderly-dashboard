import React from 'react';
import classNames from 'classnames';

const DialogBody = ({children, className}) => {
    return (
        <div className={classNames(
            "DialogBody",
            className,
        )}>
            {children}
        </div>
    )
};

export default DialogBody;
