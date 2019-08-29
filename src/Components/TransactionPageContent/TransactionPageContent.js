import React from 'react';
import PropTypes from 'prop-types';

import {Transaction} from "../../Core/models";

import {TransactionExecution, TransactionGeneralInformation, TransactionStackTrace} from "../index";

const TransactionPageContent = ({transaction, contracts, callTrace, stackTrace, projectId}) => {
    return (
        <div className="TransactionPageContent">
            <TransactionGeneralInformation contracts={contracts} transaction={transaction}/>
            {!transaction.status && <TransactionStackTrace stackTrace={stackTrace} contracts={contracts}/>}
            <TransactionExecution projectId={projectId} transaction={transaction} stackTrace={stackTrace} callTrace={callTrace} contracts={contracts}/>
        </div>
    )
};

TransactionPageContent.propTypes = {
    transaction: PropTypes.instanceOf(Transaction).isRequired,
    contracts: PropTypes.array.isRequired,
    callTrace: PropTypes.object.isRequired,
    stackTrace: PropTypes.object,
    projectId: PropTypes.string,
};

export default TransactionPageContent;
