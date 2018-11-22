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
        case ContractTypes.VERIFIED:
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
                <div className="Description">{event.description} at {contract.name}:{event.lineNumber}</div>
            </div>
            {contract.type === ContractTypes.PRIVATE && <div className="ContractColumn ItemColumn">
                <a onClick={event => event.stopPropagation()} href={`/project/${contract.projectId}/contract/${contract.id}`} className="ContractName">
                    {contract.getFileName()}
                </a>
            </div>}
            {contract.type === ContractTypes.PRIVATE && <div className="NetworkColumn ItemColumn">
                <NetworkTag network={contract.network} size="small"/>
            </div>}
            <div className="TimeColumn ItemColumn">
                <span>{moment(event.timestamp).fromNow()}</span>
            </div>
            <div className="TransactionColumn ItemColumn">
                <div>
                    <EtherscanLink onClick={event => event.stopPropagation()} network={contract.network} type={EtherscanLinkTypes.TRANSACTION} value={event.transactionId} title={event.transactionId}>{generateShortAddress(event.transactionId, 8, 6)}</EtherscanLink>
                </div>
            </div>
            <div className="BlockColumn ItemColumn">
                <div>
                    <EtherscanLink onClick={event => event.stopPropagation()} network={contract.network} type={EtherscanLinkTypes.BLOCK} value={event.block}>{event.block}</EtherscanLink>
                </div>
            </div>
        </PageLink>
    )
};

const EventList = ({events, contracts}) => {
    return (
        <div className="EventList">
            <div className="EventListHeader">
                <div className="GeneralColumn ItemColumn">
                    <span className="ColumnName">Event</span>
                </div>
                <div className="ContractColumn ItemColumn">
                    <span className="ColumnName">Contract</span>
                </div>
                <div className="NetworkColumn ItemColumn">
                    <span className="ColumnName">Network</span>
                </div>
                <div className="TimeColumn ItemColumn">
                    <span className="ColumnName">Last Event</span>
                </div>
                <div className="TransactionColumn ItemColumn">
                    <span className="ColumnName">Transaction</span>
                </div>
                <div className="BlockColumn ItemColumn">
                    <span className="ColumnName">Block</span>
                </div>
            </div>
            <div className="EventListWrapper">
                {events.map(event => <EventListItem key={event.transactionId} event={event} contract={contracts[event.contractId]} />)}
            </div>
        </div>
    );
};

export default EventList;
