import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Card.scss';

const CardColorClassMap = {
    'light': 'Card--Light',
};

const Card = ({children, className, color, clickable, onClick}) => {
    return (
        <div className={classNames(
            "Card",
            className,
            CardColorClassMap[color],
            {
                "Card--Clickable": clickable || !!onClick,
            },
        )} onClick={onClick}>
            {children}
        </div>
    )
};

Card.propTypes = {
    color: PropTypes.oneOf(['light']),
};

Card.defaultProps = {
    clickable: false,
};

export default Card;
