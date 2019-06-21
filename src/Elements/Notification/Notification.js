import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {Icon} from "../index";

import './Notification.scss';

const Notification = ({title, description, icon, type}) => {
    return (
        <div className={classNames(
            "Notification",
            type,
        )}>
            <div className="NotificationIconWrapper">
                <Icon icon={icon}/>
            </div>
            <div className="NotificationContent">
                <div className="NotificationTitle">{title}</div>
                {!!description && <div className="NotificationDescription">{description}</div>}
            </div>
        </div>
    )
};

Notification.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    type: PropTypes.string,
    icon: PropTypes.string,
};

Notification.defaultProps = {
    icon: "triangle",
};

export default Notification;
