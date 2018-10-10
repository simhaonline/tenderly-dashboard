import React from 'react';
import moment from "moment";

import {generateShortAddress} from "../../Utils/AddressFormatter";

import {NetworkAppToApiTypeMap, NetworkRouteTypes, NetworkTypes} from "../../Common/constants";
import PageLink from "../PageLink/PageLink";

import './EventList.css';

const EventList = ({events, contract}) => {
    const routeNetwork = NetworkAppToApiTypeMap[contract.network];

    let etherscanPrefix = '';

    if (contract.network === NetworkTypes.KOVAN) {
        etherscanPrefix = NetworkRouteTypes.KOVAN + '.';
    }

    return (
        <div className="EventListWrapper">
            {events.map(event =>
                <PageLink key={event.transactionId} className="EventListItem" to={`/contract/${routeNetwork}/${contract.id}/error/${event.transactionId}`}>
                    <div className="GeneralColumn ItemColumn">
                        <div className="Message">{event.message}</div>
                        <div className="Description">{event.description} | {contract.name}:{event.lineNumber}</div>
                    </div>
                    <div className="TimeColumn ItemColumn">
                        <div className="InfoLabel">Occurred</div>
                        <div className="SmallInfo">
                            <span>{moment(event.timestamp).format("MMM DD YYYY, HH:mm:ss")}</span>
                        </div>
                    </div>
                    <div className="TransactionColumn ItemColumn">
                        <div className="InfoLabel">Transaction</div>
                        <div className="SmallInfo">
                            <a onClick={event => event.stopPropagation()} target="_blank" href={`https://${etherscanPrefix}etherscan.io/tx/${event.transactionId}`} title={event.transactionId}>{generateShortAddress(event.transactionId)}</a>
                        </div>
                    </div>
                    <div className="BlockColumn ItemColumn">
                        <div className="InfoLabel">Block</div>
                        <div className="SmallInfo">
                            <a onClick={event => event.stopPropagation()} target="_blank" href={`https://${etherscanPrefix}etherscan.io/block/${event.block}`}>{event.block}</a>
                        </div>
                    </div>
                </PageLink>
            )}
        </div>
    );
};

export default EventList;
