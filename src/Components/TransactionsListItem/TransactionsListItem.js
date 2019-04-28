import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Transaction} from "../../Core/Transaction/Transaction.model";

import {Icon} from "../../Elements";
import {NetworkTag, TransactionStatusTag} from "../../Components";

import './TransactionsListItem.scss';

class TransactionsListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
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
        const {expanded} = this.state;

        return (
            <div className="TransactionsListItem">
                <div className="MainTxWrapper">
                    <div className="">
                        <TransactionStatusTag status={transaction.status}/>
                    </div>
                    <div className="">
                        {transaction.txHash}
                    </div>
                    <div className="">
                        {transaction.block}
                    </div>
                    <div>
                        <NetworkTag network={transaction.network} short/>
                    </div>
                    <div className="ExpandWrapper" onClick={this.handleExpandToggle}>
                        <Icon icon="chevron-down"/>
                    </div>
                </div>
                {expanded && <div className="ExpandedInfoWrapper">
                    <div className="">
                        {transaction.from}
                    </div>
                    <div className="">
                        {transaction.to}
                    </div>
                    <div className="">
                        {transaction.gasLimit}
                    </div>
                    <div className="">
                        {transaction.gasPrice}
                    </div>
                    <div className="">
                        {transaction.gasUsed}
                    </div>
                    <div className="">
                        {transaction.nonce}
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
