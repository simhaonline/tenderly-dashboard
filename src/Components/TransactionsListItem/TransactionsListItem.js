import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

import {EtherscanLinkTypes, NetworkAppToRouteTypeMap} from "../../Common/constants";
import {generateShortAddress} from "../../Utils/AddressFormatter";

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

        const {transaction, contracts} = props;

        const txContract = contracts.find(contract => contract.id === transaction.to);

        const gasUsedPercentage = transaction.gasUsed / transaction.gasLimit * 100;

        this.state = {
            expanded: false,
            gasUsedPercentage,
            txContract,
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
        const {expanded, gasUsedPercentage, txContract} = this.state;

        return (
            <div className="TransactionsListItem">
                <div className="MainInfoWrapper">
                    <div className="StatusColumn ItemColumn">
                        <TransactionStatusTag status={transaction.status}/>
                    </div>
                    <div className="TxHashColumn ItemColumn">
                        <EtherscanLink value={transaction.txHash} network={transaction.network} type={EtherscanLinkTypes.TRANSACTION}>
                            {generateShortAddress(transaction.txHash, 8, 6)}
                        </EtherscanLink>
                    </div>
                    <div className="BlockColumn ItemColumn">
                        <EtherscanLink value={transaction.block} network={transaction.network} type={EtherscanLinkTypes.BLOCK}>
                            {transaction.block}
                        </EtherscanLink>
                    </div>
                    <div className="NetworkColumn ItemColumn">
                        <NetworkTag network={transaction.network} size="small"/>
                    </div>
                    <div className="ActionColumn ItemColumn">
                        {!transaction.status && <Link to={`/project/${transaction.projectId}/error/${NetworkAppToRouteTypeMap[transaction.network]}/${transaction.txHash}`}>
                            View Stack Trace
                        </Link>}
                    </div>
                    <div className="ExpandColumn ItemColumn">
                        <div className="ExpandWrapper" onClick={this.handleExpandToggle}>
                            <Icon icon="chevron-down"/>
                        </div>
                    </div>
                </div>
                {expanded && <div className="ExpandedInfoWrapper">
                    <div className="TransactionInfoWrapper">
                        <EtherscanLink network={transaction.network} value={transaction.from}
                                       type={EtherscanLinkTypes.ADDRESS}>
                            {transaction.from}
                        </EtherscanLink>
                        <Icon icon="arrow-right-circle" className="InfoIcon"/>
                        {txContract ?
                            <div>
                                <Link to={`/project/${txContract.projectId}/contract/${txContract.id}`}>
                                    {txContract.name}
                                </Link>
                                <span> (<EtherscanLink network={transaction.network} value={transaction.to}
                                                      type={EtherscanLinkTypes.ADDRESS}>
                                    {generateShortAddress(transaction.to, 8, 6)}
                                </EtherscanLink>)</span>
                            </div>
                            : <EtherscanLink network={transaction.network} value={transaction.to}
                                             type={EtherscanLinkTypes.ADDRESS}>
                                {transaction.to}
                            </EtherscanLink>}
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
