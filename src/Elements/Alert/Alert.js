import React, {Component} from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';

import './Alert.scss';

const AlertColorClassMap = {
    info: 'Alert--Info',
    danger: 'Alert--Danger',
    warning: 'Alert--Warning',
};

class Alert extends Component {
    render() {
        const {color, className, animation, children} = this.props;

        const colorClass = AlertColorClassMap[color];

        return (
            <div className={classNames(
                "Alert",
                className,
                colorClass,
                {
                    'Alert--Animated': animation,
                }
            )}>
                {children}
            </div>
        )
    }
}

Alert.propTypes = {
    color: PropTypes.oneOf(['info', 'danger', 'warning']),
    animation: PropTypes.bool,
    className: PropTypes.string,
};

Alert.defaultProps = {
    color: 'default',
};

export default Alert;
