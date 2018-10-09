import React from 'react';
import {Link} from "react-router-dom";

import {generateShortAddress} from "../../Utils/AddressFormatter";

import './EventList.css';
import {NetworkAppToApiTypeMap} from "../../Common/constants";

const EventList = ({events, contract}) => {
    const routeNetwork = NetworkAppToApiTypeMap[contract.network];
    
    return (
        <div className="EventListWrapper">
            {events.map(event =>
                <Link key={event.transactionId} className="EventListItem" to={`/contract/${routeNetwork}/${contract.id}/error/${event.transactionId}`}>
                    <div className="GeneralColumn ItemColumn">
                        <div className="Message">{event.message}</div>
                        <div className="Description">{event.description} | {contract.name}:{event.lineNumber}</div>
                    </div>
                    <div className="TransactionColumn ItemColumn">
                        <span title={event.transactionId}>{generateShortAddress(event.transactionId)}</span>
                    </div>
                    <div className="BlockColumn ItemColumn">{event.block}</div>
                    <div className="TimeColumn ItemColumn">{event.timestamp}</div>
                </Link>
            )}
        </div>
    );
};

export default EventList;
