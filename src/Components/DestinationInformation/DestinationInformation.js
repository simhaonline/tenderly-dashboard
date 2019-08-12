import React from 'react';
import PropTypes from 'prop-types';

import {NotificationDestination} from "../../Core/models";

import {NotificationDestinationTypes} from "../../Common/constants";

const DestinationInformation = ({destination}) => {
    switch (destination.type) {
        case NotificationDestinationTypes.EMAIL:
            return <span className="MutedText">{destination.information.email}</span>;
        default:
            return null;
    }
};

DestinationInformation.propTypes = {
    destination: PropTypes.instanceOf(NotificationDestination)
};

export default DestinationInformation;
