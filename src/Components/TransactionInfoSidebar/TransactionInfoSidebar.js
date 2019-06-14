import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment";

import {EtherscanLinkTypes} from "../../Common/constants";

import {Panel} from "../../Elements";
import {EtherscanLink, NetworkTag, TransactionStatusTag} from "../index";

import './TransactionInfoSidebar.scss';

const TxInfoItem = ({label, children}) => (
    <div className="TxInfoItem">
        <div className="ItemLabel">{label}</div>
        <div className="ItemValue">{children}</div>
    </div>
);

const TransactionInfoSidebar = ({transaction, contract}) => {
    return (
        <Panel className="TransactionInfoSidebar">
            <TxInfoItem label="Network:">
                <NetworkTag network={transaction.network}/>
            </TxInfoItem>
            <TxInfoItem label="Status:">
                <TransactionStatusTag status={transaction.status}/>
            </TxInfoItem>
            <TxInfoItem label="Timestamp:">
                <div>{moment(transaction.timestamp).fromNow()}</div>
                <div className="MutedText">({transaction.timestamp})</div>
            </TxInfoItem>
            <div className="TxInfoSeparator"/>
            <TxInfoItem label="Block:">
                <EtherscanLink value={transaction.block} network={transaction.network} type={EtherscanLinkTypes.BLOCK}>
                    {transaction.block}
                </EtherscanLink>
            </TxInfoItem>
            <TxInfoItem label="Gas Used:">
                <span className="MutedText">{transaction.gasUsed}</span>
            </TxInfoItem>
            <TxInfoItem label="Gas Price:">
                <span className="MutedText">{transaction.gasPrice}</span>
            </TxInfoItem>
            <TxInfoItem label="Nonce:">
                <span className="MutedText">{transaction.nonce}</span>
            </TxInfoItem>
        </Panel>
    )
};

TransactionInfoSidebar.propTypes = {
    transaction: PropTypes.object.isRequired,
    contract: PropTypes.object.isRequired,
};

export default TransactionInfoSidebar;
