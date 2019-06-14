import React from 'react';

import {Icon, Card} from "../../Elements";
import EventList from "../EventList/EventList";

import './ProjectEvents.scss';

const ProjectEvents = ({events, contracts}) => {
    if (!events.length) {
        return (
            <Card className="ProjectEventsEmptyState">
                <Icon icon="transaction" className="EmptyStateIcon"/>
                <div className="EmptyStateHeading">Phew! Sit back and relax</div>
                <div className="EmptyStateDescription">There are currently no captured failed transactions. As soon as one happens it will appear here.</div>
            </Card>
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
