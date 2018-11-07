import React from 'react';

import './ProjectEvents.css';

const ProjectEvents = ({events, onFiltersUpdate}) => {
    console.log(events);

    if (!events.length) {
        return (
            <div className="ProjectEventsEmtpySTat">
                No events
            </div>
        )
    }

    return (
        <div className="ProjectEvents">
            eeeevents
        </div>
    );
};

export default ProjectEvents;
