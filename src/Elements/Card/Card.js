import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Card.scss';

const CardColorClassMap = {
    'light': 'Card--Light',
};

const CardHighlightColorClassMap = {
    'secondary': 'Card--HighlightSecondary',
};

const Card = ({children, className, color, clickable, selectable, selected, onClick, highlightColor, disabled}) => {
    return (
        <div className={classNames(
            "Card",
            className,
            CardHighlightColorClassMap[highlightColor],
            CardColorClassMap[color],
            {
                "Card--Clickable": clickable,
                "Card--Selectable": selectable,
                "Card--Selected": selected,
                "Card--Disabled": disabled,
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
    disabled: PropTypes.bool,
    highlightColor: PropTypes.oneOf(['secondary']),
    color: PropTypes.oneOf(['light']),
};

Card.defaultProps = {
    clickable: false,
};

export default Card;
