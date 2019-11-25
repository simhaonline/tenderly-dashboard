import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './PulsingDot.scss';

const pulsingDotColorClassMap = {
    'blue-purple': 'PulsingDot--BluePurple',
    'red-purple': 'PulsingDot--RedPurple',
    'blue-green': 'PulsingDot--BlueGreen',
};

const PulsingDot = ({color}) => {
    return (
        <div className={classNames(
            "PulsingDot",
            pulsingDotColorClassMap[color],
        )}>
            <div className="PulsingDot__Dot PulsingDot__Dot--Outer"/>
            <div className="PulsingDot__Dot PulsingDot__Dot--Middle"/>
            <div className="PulsingDot__Dot PulsingDot__Dot--Inner"/>
        </div>
    );
};

PulsingDot.propTypes = {
    color: PropTypes.oneOf(['blue-purple', 'red-purple', 'blue-green']).isRequired,
};

export default PulsingDot;
