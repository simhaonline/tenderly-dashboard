import React from 'react';
import classNames from 'classnames';

import './Card.scss';

const Card = ({children, className, clickable, onClick}) => {
    return (
        <div className={classNames(
            "Card",
            className,
            {
                "Clickable": clickable || !!onClick,
            },
        )} onClick={onClick}>
            {children}
        </div>
    )
};

Card.defaultProps = {
    clickable: false,
};

export default Card;
