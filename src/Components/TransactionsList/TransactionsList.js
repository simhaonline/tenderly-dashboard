import React from 'react';
import PropTypes from 'prop-types';

import {TransactionsListItem} from "../index";

import './TransactionsList.scss';
import {Card, Icon} from "../../Elements";

const TransactionsList = ({transactions, contracts}) => {
    if (!transactions.length) {
        return (
            <div className="TransactionsListEmptyState">
                <Icon icon="transaction" className="EmptyStateIcon"/>
                <div className="EmptyStateHeading">Looks empty in here</div>
                <div className="EmptyStateDescription">There are currently no captured incoming transactions to the contracts in this project. As soon as one happens it will appear here.</div>
            </div>
        );
    }

    return (
        <div className="TransactionsList">
            <div className="TransactionsListHeader">
                <div className="StatusColumn ItemColumn">
                    <span className="ColumnName">Status</span>
                </div>
                <div className="TxHashColumn ItemColumn">
                    <span className="ColumnName">Transaction</span>
                </div>
                <div className="BlockColumn ItemColumn">
                    <span className="ColumnName">Block</span>
                </div>
                <div className="NetworkColumn ItemColumn">
                    <span className="ColumnName">Network</span>
                </div>
                <div className="TimestampColumn ItemColumn">
                    <span className="ColumnName">Timestamp</span>
                </div>
                <div className="ActionColumn ItemColumn">
                    <span className="ColumnName">Actions</span>
                </div>
            </div>
            {transactions.map(tx => <TransactionsListItem key={tx.txHash} transaction={tx} contracts={contracts}/>)}
        </div>
    )
};

TransactionsList.propTypes = {
    transactions: PropTypes.array.isRequired,
    currentPage: PropTypes.number,
    onPageChange: PropTypes.func,
};

export default TransactionsList;
