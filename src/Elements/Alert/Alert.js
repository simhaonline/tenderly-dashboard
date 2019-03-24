import React, {Component} from 'react';
import classNames from 'classnames';

import './Alert.css';

/**
 * @param {string} color
 * @returns {string}
 */
function getAlertColorClass(color) {
    switch (color) {
        case 'info':
            return 'Info';
        case 'danger':
            return 'Danger';
        default:
            return '';
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
