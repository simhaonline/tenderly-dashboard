import React from 'react';

import './EventInformation.css';

const EventInformation = ({event}) => {
    return (
        <div className="EventInformation">
            {event.message}
        </div>
    )
};

export default EventInformation;
