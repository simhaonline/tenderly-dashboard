import React from 'react';
import PropTypes from 'prop-types';

import {FeatureFlagTypes} from "../../Common/constants";

import {TransactionExecution, TransactionHeader, CallTraceFlameGraph, FeatureFlag} from "../index";

const TransactionPageContent = ({transaction, contract, callTrace, stackTrace}) => {
    return (
        <div className="TransactionPageContent">
            <TransactionHeader contract={contract} transaction={transaction}/>
            <TransactionExecution transaction={transaction} stackTrace={stackTrace} callTrace={callTrace} contract={contract}/>
            <FeatureFlag flag={FeatureFlagTypes.COMING_SOON}>
                <CallTraceFlameGraph callTrace={callTrace}/>
            </FeatureFlag>
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
