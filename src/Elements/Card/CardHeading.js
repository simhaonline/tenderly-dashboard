import React from 'react';
import classNames from 'classnames';

const CardHeading = ({children, className}) => {
    return (
        <div className={classNames(
            "CardHeading",
            className,
        )}>
            {children}
        </div>
    )
};

export default CardHeading;
