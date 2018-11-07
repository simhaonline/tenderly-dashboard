import React from 'react';
import moment from "moment";

import {generateShortAddress} from "../../Utils/AddressFormatter";

import {ContractTypes, EtherscanLinkTypes, NetworkAppToRouteTypeMap} from "../../Common/constants";
import EtherscanLink from "../EtherscanLink/EtherscanLink";
import NetworkTag from "../NetworkTag/NetworkTag";
import PageLink from "../PageLink/PageLink";

import './EventList.css';

/**
 * @param {Event} event
 * @param {Contract} contract
 * @return {string}
 */
function getEventPageLink(event, contract) {
    const routeNetwork = NetworkAppToRouteTypeMap[contract.network];

    switch (contract.type) {
        case ContractTypes.PRIVATE:
            return `/project/${contract.projectId}/event/${routeNetwork}/${event.id}`;
        case ContractTypes.PUBLIC_VERIFIED:
            return `/contract/${routeNetwork}/${contract.id}/error/${event.transactionId}`;
        default:
            return '';
    }
}

const EventListItem = ({event, contract}) => {
    return (
        <PageLink className="EventListItem" to={getEventPageLink(event, contract)}>
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
            {contract.type === ContractTypes.PRIVATE && <div className="ContractColumn ItemColumn">
                <div>
                    {contract.getFileName()}
                </div>
                <NetworkTag network={contract.network}/>
            </div>}
        </PageLink>
    )
};

const EventList = ({events, contracts}) => {
    return (
        <div className="EventListWrapper">
            {events.map(event => <EventListItem key={event.transactionId} event={event} contract={contracts[event.contractId]} />)}
        </div>
    );
};

export default EventList;
