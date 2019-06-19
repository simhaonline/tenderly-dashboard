import React from 'react';

import {TransactionStatusTag} from "../index";

const TransactionStatusColumn = ({status}) => {
    return (
        <TransactionStatusTag status={status}/>
    )
};

export default TransactionStatusColumn;

