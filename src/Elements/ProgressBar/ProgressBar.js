import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';

import './ProgressBar.scss';

const ProgressBarColorClassMap = {
    "success": "ProgressBar--Success",
    "secondary": "ProgressBar--Secondary",
    "danger": "ProgressBar--Danger",
};

const ProgressBar = ({className, displayPercentage, color, value}) => {
    const sanitizedValue = _.round(_.clamp(value, 0, 100), 2);


    return (
        <div className={classNames(
            "ProgressBar",
            className,
            ProgressBarColorClassMap[color],
        )}>
            <div className="ProgressBar__Bar" style={{width: `${sanitizedValue}%`}}>
                {displayPercentage && <span className="ProgressBar__Bar__Percentage">{sanitizedValue}%</span>}
            </div>
        </div>
    );
};

ProgressBar.propTypes = {
    className: PropTypes.string,
    displayPercentage: PropTypes.bool,
    color: PropTypes.oneOf(["success", "secondary", "danger"]),
    value: PropTypes.number.isRequired,
};

ProgressBar.defaultProps = {
    displayPercentage: false,
};

export default ProgressBar;
