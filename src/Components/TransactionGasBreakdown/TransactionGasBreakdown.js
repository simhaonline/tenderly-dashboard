import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {CallTrace, Transaction} from "../../Core/models";

import {CallTraceFlameGraph} from "../index";

class TransactionGasBreakdown extends Component {
    render() {
        const {callTrace, transaction} = this.props;

        return (
            <div className="TransactionGasBreakdown">
                <CallTraceFlameGraph callTrace={callTrace} transaction={transaction}/>
            </div>
        );
    }
}

PropTypes.propTypes = {
    transaction: PropTypes.instanceOf(Transaction).isRequired,
    callTrace: PropTypes.instanceOf(CallTrace).isRequired,
};

export default TransactionGasBreakdown;
