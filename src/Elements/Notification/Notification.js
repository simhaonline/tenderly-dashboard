import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {Icon} from "../index";

import './Notification.scss';

const Notification = ({title, description, type}) => {
    return (
        <div className={classNames(
            "Notification",
            type,
        )}>
            <div className="NotificationIconWrapper">
                <Icon icon="triangle"/>
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
};

export default Notification;
