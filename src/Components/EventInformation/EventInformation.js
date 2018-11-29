import React from 'react';
import moment from "moment";

import EtherscanLink from "../EtherscanLink/EtherscanLink";

import './EventInformation.css';
import {EtherscanLinkTypes} from "../../Common/constants";
import {generateShortAddress} from "../../Utils/AddressFormatter";

const EventInformation = ({event, network}) => {
    return (
        <div className="EventInformation">
            <div className="MainInfo">
                <h2 className="MainMessage">{event.message}</h2>
                <div className="Timestamp">Occurred at: <span>{moment(event.timestamp).format("MMM DD YYYY, HH:mm:ss")}</span></div>
            </div>
            <div className="OtherInfo">
                <div className="InfoItem">Transaction: <EtherscanLink network={network} type={EtherscanLinkTypes.TRANSACTION} value={event.transactionId}>{generateShortAddress(event.transactionId, 8, 8)}</EtherscanLink></div>
                <div className="InfoItem">Block: <EtherscanLink network={network} type={EtherscanLinkTypes.BLOCK} value={event.block}>{event.block}</EtherscanLink></div>
            </div>
        </div>
    )
};

export default EventInformation;
