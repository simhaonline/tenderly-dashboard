import React from 'react';
import PropTypes from 'prop-types';

import {FeatureFlagTypes} from "../../Common/constants";

import {TransactionExecution, TransactionHeader, CallTraceFlameGraph, FeatureFlag} from "../index";

const TransactionPageContent = ({transaction, contracts, callTrace, stackTrace}) => {
    return (
        <div className="TransactionPageContent">
            <TransactionHeader contracts={contracts} transaction={transaction}/>
            <TransactionExecution transaction={transaction} stackTrace={stackTrace} callTrace={callTrace} contracts={contracts}/>
            <FeatureFlag flag={FeatureFlagTypes.COMING_SOON}>
                <CallTraceFlameGraph callTrace={callTrace}/>
            </FeatureFlag>
        </div>
    )
};

TransactionPageContent.propTypes = {
    transaction: PropTypes.object.isRequired,
    contracts: PropTypes.array.isRequired,
    callTrace: PropTypes.object.isRequired,
    stackTrace: PropTypes.object,
};

export default TransactionPageContent;
