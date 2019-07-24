import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {CallTrace, Transaction} from "../../Core/models";

import {CallTraceFlameGraph} from "../index";

import './TransactionGasBreakdown.scss';

class TransactionGasBreakdown extends Component {
    render() {
        const {callTrace, transaction} = this.props;

        const gasUsedDecimal = transaction.gasUsed / transaction.gasLimit;
        const gasUsedPercentage = Number(transaction.gasUsed / transaction.gasLimit).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2});

        console.log(gasUsedPercentage);

        return (
            <div className="TransactionGasBreakdown">
                <div className="MarginBottom4">
                    <div className="GasUsageInfo">
                        <div className="MonospaceFont MarginBottom2">{transaction.gasUsed} / {transaction.gasLimit} Gwei Used</div>
                        <div className="GasUsagePercentage">
                            <div className={classNames(
                                "GasUsagePercentageBar",
                                {
                                    "Low": gasUsedDecimal <= 0.7,
                                    "Medium": gasUsedDecimal <= 0.9 && gasUsedDecimal > 0.7,
                                    "High": gasUsedDecimal > 0.9,
                                },
                            )} style={{
                                width: gasUsedPercentage,
                            }}>
                                <span className="MonospaceFont">{gasUsedPercentage}</span>
                            </div>
                        </div>
                    </div>
                </div>
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
