import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Card.scss';

const CardColorClassMap = {
    'light': 'Card--Light',
    'dark': 'Card--Dark',
};

const CardHighlightColorClassMap = {
    'secondary': 'Card--HighlightSecondary',
    'danger': 'Card--HighlightDanger',
};

const Card = ({children, className, color, clickable, selectable, selected, onClick, highlightColor, noPadding, disabled}) => {
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
                "Card--NoPadding": noPadding,
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
    noPadding: PropTypes.bool,
    highlightColor: PropTypes.oneOf(['secondary', 'danger']),
    color: PropTypes.oneOf(['light', 'dark']),
};

Card.defaultProps = {
    clickable: false,
    noPadding: false,
};

export default Card;
