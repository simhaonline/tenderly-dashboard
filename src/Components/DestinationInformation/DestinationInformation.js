import React from 'react';
import PropTypes from 'prop-types';

import {NotificationDestination} from "../../Core/models";

import {NotificationDestinationTypes} from "../../Common/constants";

/**
 * @param {NotificationDestination} destination
 */
const DestinationInformation = ({destination}) => {
    switch (destination.type) {
        case NotificationDestinationTypes.EMAIL:
            if (!destination.enabled) {
                return <span><span className="WarningText SemiBoldText">Unverified</span> {destination.information.email}</span>
            }

            return <span>{destination.information.email}</span>;
        case NotificationDestinationTypes.SLACK:
            return <span>Channel: {destination.information.channel}</span>;
        default:
            return null;
    }
};

DestinationInformation.propTypes = {
    destination: PropTypes.instanceOf(NotificationDestination)
};

export default DestinationInformation;
