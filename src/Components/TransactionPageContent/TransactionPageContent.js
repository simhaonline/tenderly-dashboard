import React from 'react';
import PropTypes from 'prop-types';

import {TransactionExecution, TransactionInfo, TransactionHeader, CallTraceFlameGraph} from "../index";

const TransactionPageContent = ({transaction, contract, callTrace, stackTrace}) => {
    return (
        <div className="TransactionPageContent">
            <TransactionHeader contract={contract} transaction={transaction}/>
            <TransactionInfo contract={contract} transaction={transaction}/>
            <TransactionExecution transaction={transaction} stackTrace={stackTrace} callTrace={callTrace} contract={contract}/>
            <CallTraceFlameGraph callTrace={callTrace}/>
        </div>
    )
};

TransactionPageContent.propTypes = {
    transaction: PropTypes.object.isRequired,
    contract: PropTypes.object.isRequired,
    callTrace: PropTypes.object.isRequired,
    stackTrace: PropTypes.object,
};

export default TransactionPageContent;
