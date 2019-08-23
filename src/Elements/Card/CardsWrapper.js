import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const CardsWrapper = ({children, className, horizontal}) => {
    return (
        <div className={classNames(
            "CardsWrapper",
            className,
            {
                "CardsWrapper--Horizontal": horizontal,
            },
        )}>
            {children}
        </div>
    )
};

CardsWrapper.propTypes = {
    horizontal: PropTypes.bool,
};

export default CardsWrapper;
