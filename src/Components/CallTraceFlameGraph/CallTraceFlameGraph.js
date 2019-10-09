import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {CallTrace, Transaction} from "../../Core/models";

import {FlameGraph} from "../index";

class CallTraceFlameGraph extends Component {
    constructor(props) {
        super(props);

        const graphData = this.computeGraphData(props.callTrace, props.transaction);

        this.state = {
            graphData,
        };
    }

    /**
     * @param {Trace[]} traces
     * @return {Object[]}
     */
    computeTraceToGraphChildren = (traces) => {
        if (!traces || !traces.length) {
            return null;
        }

        const data = [

        ];

        traces.forEach(trace => {
            data.push({
                name: `${trace.functionName || trace.contract} - ${trace.gasUsed} Gas`,
                value: trace.gasUsed,
                children: this.computeTraceToGraphChildren(trace.calls),
            });
        });

        return data;
    };

    /**
     * @param {CallTrace} callTrace
     * @param {Transaction} transaction
     * @return {Object}
     */
    computeGraphData = (callTrace, transaction) => {
        const totalGas = callTrace.trace.gasUsed + callTrace.initialGas;

        return {
            name: `Total Gas - ${totalGas} Gas`,
            value: callTrace.trace.gasUsed + callTrace.initialGas,
            children: [
                {
                    name: `Actual Gas Used - ${transaction.gasUsed} Gas`,
                    value: transaction.gasUsed,
                    children: [
                        {
                            name: `Initial Gas - ${callTrace.initialGas} Gas`,
                            value: callTrace.initialGas,
                        },
                        ...this.computeTraceToGraphChildren([callTrace.trace]),
                    ],
                },
                {
                    name: `Refunded Gas - ${callTrace.refundedGas} Gas`,
                    value: callTrace.refundedGas,
                },
            ],
        }
    };

    render() {
        const {graphData} = this.state;

        return (
            <div className="CallTraceFlameGraph">
                <FlameGraph data={graphData} stretch/>
            </div>
        );
    }
}

CallTraceFlameGraph.propTypes = {
    callTrace: PropTypes.instanceOf(CallTrace).isRequired,
    transaction: PropTypes.instanceOf(Transaction).isRequired,
};

export default CallTraceFlameGraph;
