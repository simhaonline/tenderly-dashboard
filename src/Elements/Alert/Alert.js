import React, {Component} from 'react';
import classNames from 'classnames';

import './Alert.css';

/**
 * @param {string} color
 * @returns {string}
 */
function getAlertColorClass(color) {
    switch (color) {
        case 'secondary':
            return 'Secondary';
        case 'danger':
            return 'Danger';
        default:
            return 'Primary';
    }
}

class Alert extends Component {
    render() {
        const {color, className, animation, children} = this.props;

        const colorClass = getAlertColorClass(color);

        return (
            <div className={classNames(
                "Alert",
                className,
                colorClass,
                {
                    'Animated': animation,
                }
            )}>
                {children}
            </div>
        )
    }
}

Alert.defaultProps = {
    color: 'default',
};

export default Alert;
