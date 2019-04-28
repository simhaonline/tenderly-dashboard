import React from 'react';

import './TransactionsListItem.scss';

const TransactionsListItem = ({transaction}) => {
    return (
        <div className="TransactionsListItem">
            {transaction.txHash}
        </div>
    );
};

export default TransactionsListItem;
