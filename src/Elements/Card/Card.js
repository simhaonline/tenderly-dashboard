import React from 'react';
import classNames from 'classnames';

import './Card.css';

const Card = ({children, className, clickable}) => {
    return (
        <div className={classNames(
            "Card",
            className,
            {
                "Clickable": clickable,
            },
        )}>
            {children}
        </div>
    )
};

Card.defaultProps = {
    clickable: false,
};

export default Card;
