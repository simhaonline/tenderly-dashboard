import React from 'react';
import PropTypes from 'prop-types';

import {CallTracePreview, TransactionInfoSidebar, TransactionHeader} from "../index";

import './TransactionPageContent.scss';

const TransactionPageContent = ({transaction, contract, callTrace}) => {
    return (
        <div className="TransactionPageContent">
            <TransactionHeader contract={contract} transaction={transaction}/>
            <div className="TraceAndSidebarWrapper">
                <CallTracePreview callTrace={callTrace} contract={contract}/>
                <TransactionInfoSidebar contract={contract} transaction={transaction}/>
            </div>
        </div>
    )
};

TransactionPageContent.propTypes = {
    transaction: PropTypes.object.isRequired,
    contract: PropTypes.object.isRequired,
    callTrace: PropTypes.object.isRequired,
};

export default TransactionPageContent;
