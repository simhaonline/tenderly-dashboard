import React from 'react';
import PropTypes from 'prop-types';

import {TransactionExecution, TransactionInfoSidebar, TransactionHeader, CallTraceFlameGraph} from "../index";

import './TransactionPageContent.scss';

const TransactionPageContent = ({transaction, contract, callTrace, stackTrace}) => {
    return (
        <div className="TransactionPageContent">
            <TransactionHeader contract={contract} transaction={transaction}/>
            <div className="TraceAndSidebarWrapper">
                <TransactionExecution transaction={transaction} stackTrace={stackTrace} callTrace={callTrace} contract={contract}/>
                <TransactionInfoSidebar contract={contract} transaction={transaction}/>
            </div>
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
