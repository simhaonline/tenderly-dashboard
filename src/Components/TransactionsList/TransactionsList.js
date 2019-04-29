import React from 'react';
import PropTypes from 'prop-types';

import {TransactionsListItem} from "../index";

import './TransactionsList.scss';

const TransactionsList = ({transactions, contracts}) => {
    if (!transactions.length) {
        return (
            <div className="TransactionsListEmptySTate">
                empty in here
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
