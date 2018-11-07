import React from 'react';
import moment from "moment";

import {generateShortAddress} from "../../Utils/AddressFormatter";

import {EtherscanLinkTypes, NetworkAppToRouteTypeMap} from "../../Common/constants";
import EtherscanLink from "../EtherscanLink/EtherscanLink";
import PageLink from "../PageLink/PageLink";

import './EventList.css';

const EventList = ({events, contract}) => {
    const routeNetwork = NetworkAppToRouteTypeMap[contract.network];

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
                            <EtherscanLink onClick={event => event.stopPropagation()} network={contract.network} type={EtherscanLinkTypes.TRANSACTION} value={event.transactionId} title={event.transactionId}>{generateShortAddress(event.transactionId)}</EtherscanLink>
                        </div>
                    </div>
                    <div className="BlockColumn ItemColumn">
                        <div className="InfoLabel">Block</div>
                        <div className="SmallInfo">
                            <EtherscanLink onClick={event => event.stopPropagation()} network={contract.network} type={EtherscanLinkTypes.BLOCK} value={event.block}>{event.block}</EtherscanLink>
                        </div>
                    </div>
                </PageLink>
            )}
        </div>
    );
};

export default EventList;
