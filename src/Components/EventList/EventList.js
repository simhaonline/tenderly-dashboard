import React from 'react';

import './EventList.css';
import {generateShortAddress} from "../../Utils/AddressFormatter";

const EventList = ({events, contract}) => {
    return (
        <div className="EventListWrapper">
            {events.map(event =>
                <div key={event.transactionId} className="EventListItem">
                    <div className="GeneralColumn ItemColumn">
                        <div className="Message">{event.message}</div>
                        <div className="Description">{event.description} | {contract.name}:{event.lineNumber}</div>
                    </div>
                    <div className="TransactionColumn ItemColumn">
                        <span title={event.transactionId}>{generateShortAddress(event.transactionId)}</span>
                    </div>
                    <div className="BlockColumn ItemColumn">{event.block}</div>
                    <div className="TimeColumn ItemColumn">{event.timestamp}</div>
                </div>
            )}
        </div>
    );
};

export default EventList;
