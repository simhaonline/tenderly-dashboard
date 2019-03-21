import React from 'react';

import EventList from "../EventList/EventList";

import './ProjectEvents.css';

const ProjectEvents = ({events, contracts, onFiltersUpdate}) => {
    if (!events.length) {
        return (
            <div className="ProjectEventsEmtpySTat">
                No errors
            </div>
        )
    }

    const mappedContracts = contracts.reduce((data, contract) => {
        data[contract.id] = contract;

        return data;
    }, {});

    return (
        <div className="ProjectEvents">
            <EventList events={events} contracts={mappedContracts}/>
        </div>
    );
};

export default ProjectEvents;
