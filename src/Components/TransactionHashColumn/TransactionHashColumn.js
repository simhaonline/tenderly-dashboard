import React from 'react';

import {generateShortAddress} from "../../Utils/AddressFormatter";

import './TransactionHashColumn.scss';

const TransactionHashColumn = ({transaction}) => {
    return (
        <div className="TransactionHashColumn">
            {generateShortAddress(transaction.txHash, 12, 6)}
        </div>
    )
};

export default TransactionHashColumn;
