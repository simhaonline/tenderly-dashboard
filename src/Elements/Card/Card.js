import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Card.scss';

const CardColorClassMap = {
    'light': 'Card--Light',
};

const Card = ({children, className, color, clickable, selectable, selected, onClick}) => {
    return (
        <div className={classNames(
            "Card",
            className,
            CardColorClassMap[color],
            {
                "Card--Clickable": clickable,
                "Card--Selectable": selectable,
                "Card--Selected": selected,
            },
        )} onClick={onClick}>
            {children}
        </div>
    )
};

Card.propTypes = {
    clickable: PropTypes.bool,
    selectable: PropTypes.bool,
    selected: PropTypes.bool,
    color: PropTypes.oneOf(['light']),
};

Card.defaultProps = {
    clickable: false,
};

export default Card;
