import React from 'react';
import PropTypes from 'prop-types';

import {TransactionsListItem} from "../index";

import './TransactionsList.scss';

const TransactionsList = ({transactions}) => {
    if (!transactions.length) {
        return (
            <div className="TransactionsListEmptySTate">
                empty in here
            </div>
        );
    }

    return (
        <div className="TransactionsList">
            {transactions.map(tx => <TransactionsListItem key={tx.txHash} transaction={tx}/>)}
        </div>
    )
};

TransactionsList.propTypes = {
    transactions: PropTypes.array,
};

export default TransactionsList;
