import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {EtherscanLinkTypes} from "../../Common/constants";

import {Transaction} from "../../Core/Transaction/Transaction.model";

import {Icon} from "../../Elements";
import {NetworkTag, TransactionStatusTag, EtherscanLink} from "../../Components";

import './TransactionsListItem.scss';

const TransactionInfoPill = ({label, value}) => {
    return (
        <div className="TransactionInfoPill">
            <div className="PillLabel">{label}</div>
            <div className="PillValue">{value}</div>
        </div>
    )
};

class TransactionsListItem extends Component {
    constructor(props) {
        super(props);

        const {transaction} = props;

        const gasUsedPercentage = transaction.gasUsed / transaction.gasLimit * 100;

        this.state = {
            expanded: false,
            gasUsedPercentage,
        }
    }

    handleExpandToggle = () => {
        const {expanded} = this.state;

        this.setState({
            expanded: !expanded,
        });
    };

    render() {
        const {transaction} = this.props;
        const {expanded, gasUsedPercentage} = this.state;

        return (
            <div className="TransactionsListItem">
                <div className="MainInfoWrapper">
                    <div className="">
                        <TransactionStatusTag status={transaction.status}/>
                    </div>
                    <div className="">
                        <EtherscanLink value={transaction.txHash} network={transaction.network} type={EtherscanLinkTypes.TRANSACTION}>
                            {transaction.txHash}
                        </EtherscanLink>
                    </div>
                    <div className="">
                        <EtherscanLink value={transaction.block} network={transaction.network} type={EtherscanLinkTypes.BLOCK}>
                            {transaction.block}
                        </EtherscanLink>
                    </div>
                    <div>
                        <NetworkTag network={transaction.network} short/>
                    </div>
                    <div className="ExpandWrapper" onClick={this.handleExpandToggle}>
                        <Icon icon="chevron-down"/>
                    </div>
                </div>
                {expanded && <div className="ExpandedInfoWrapper">
                    <div className="TransactionInfoWrapper">
                        <EtherscanLink network={transaction.network} value={transaction.from}
                                       type={EtherscanLinkTypes.ADDRESS}>
                            {transaction.from}
                        </EtherscanLink>
                        <Icon icon="arrow-right-circle" className="InfoIcon"/>
                        <EtherscanLink network={transaction.network} value={transaction.to}
                                       type={EtherscanLinkTypes.ADDRESS}>
                            {transaction.to}
                        </EtherscanLink>
                    </div>
                    <div className="PillsWrapper">
                        <TransactionInfoPill label={'Gas Limit'} value={transaction.gasLimit}/>
                        <TransactionInfoPill label={'Gas Used'} value={`${transaction.gasUsed} (${gasUsedPercentage.toFixed(2)}%)`}/>
                        <TransactionInfoPill label={'Gas Price'} value={transaction.gasPrice}/>
                        <TransactionInfoPill label={'Nonce'} value={transaction.nonce}/>
                    </div>
                </div>}
            </div>
        );
    }
}

TransactionsListItem.propTypes = {
    transaction: PropTypes.instanceOf(Transaction),
};

export default TransactionsListItem;
