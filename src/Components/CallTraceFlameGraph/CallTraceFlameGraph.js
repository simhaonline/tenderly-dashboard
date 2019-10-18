import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import chroma from 'chroma-js';
import {Cell, Pie, PieChart, Tooltip} from "recharts";

import {CallTrace, Transaction} from "../../Core/models";

import {FlameGraph} from "../index";

/**
 * @param {Trace} parentTrace
 * @param {Trace} trace
 */
const SelectedTraceBreakdown = ({parentTrace, trace}) => {
    let graphData = [];
    const graphDataByName = {};
    let usedGasByCalls = 0;

    if (trace.calls && trace.calls.length > 0) {
        trace.calls.forEach(traceCall => {
            graphData.push();
            const name = traceCall.functionName || `Op: [${traceCall.op}]`;
            if (!graphDataByName[name]) {
                graphDataByName[name] = {
                    name,
                    gas: 0,
                    percentage: 0,
                    count: 0,
                };
            }

            graphDataByName[name].gas += traceCall.gasUsed;
            graphDataByName[name].percentage = graphDataByName[name].gas / trace.gasUsed;
            graphDataByName[name].count += 1;

            usedGasByCalls += traceCall.gasUsed;
        });
    }

    const otherGasUsed = trace.gasUsed - usedGasByCalls;

    graphData = _.orderBy(Object.values(graphDataByName), 'gas', 'desc');

    graphData.push({
        name: "Other",
        gas: otherGasUsed,
        percentage: otherGasUsed / trace.gasUsed,
    });

    const colorScale = chroma.scale(['#0069E0', '#ADD3FF']).correctLightness();

    return <div className="DisplayFlex">
        <div>
            <PieChart width={150} height={150}>
                <Pie dataKey="gas" data={graphData} cx={75} cy={75} innerRadius={20} startAngle={450} endAngle={90} isAnimationActive={false} outerRadius={60}>
                    {graphData.map((entry, index) => <Cell key={`cell-${index}`} fill={colorScale(1 / (graphData.length - 1) * index).hex()} stroke="none"/>)}
                </Pie>
                <Tooltip/>
            </PieChart>
        </div>
        <div className="MarginLeft4">
            {graphData.map((datum, index) => <div key={index}>
                <span className="MutedText">{_.round(datum.percentage * 100, 2).toFixed(2)}%</span>
                <span> - {datum.name}</span>
                {!!datum.count && datum.count > 1 && <span> [{datum.count}]</span>}
            </div>)}
        </div>
    </div>;
};

class CallTraceFlameGraph extends Component {
    constructor(props) {
        super(props);

        const {callTrace, transaction} = props;

        const graphData = this.computeGraphData(callTrace, transaction);

        const flatCallTrace = this.flattenCallTrace(callTrace.trace);

        this.state = {
            graphData,
            currentActiveNode: null,
            flatCallTrace,
        };
    }

    /**
     * @param {Trace} trace
     * @return {Object.<string, Trace>}
     */
    flattenCallTrace = (trace) => {
        let data = {
            [trace.depthId]: trace,
        };

        if (trace.calls) {
            trace.calls.forEach(childTrace => {
                Object.assign(data, this.flattenCallTrace(childTrace));
            });
        }

        return data;
    };

    /**
     * @param {Trace[]} traces
     * @return {Object[]}
     */
    computeTraceToGraphChildren = (traces) => {
        if (!traces || !traces.length) {
            return null;
        }

        const data = [];

        traces.forEach(trace => {
            data.push({
                name: `${trace.functionName || trace.contract} - ${trace.gasUsed} Gas`,
                value: trace.gasUsed,
                depthId: trace.depthId,
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

    handleTraceClick = (item) => {
        if (item.data && item.data.depthId) {
            this.setState({
                currentActiveNode: item,
            });
        } else {
            this.setState({
                currentActiveNode: null,
            });
        }
    };

    render() {
        const {graphData, currentActiveNode: node, flatCallTrace} = this.state;

        return (
            <div className="CallTraceFlameGraph">
                <FlameGraph onClick={this.handleTraceClick} data={graphData} stretch/>
                {!!node && <SelectedTraceBreakdown parentTrace={flatCallTrace[node.parent.data.depthId]}
                                                   trace={flatCallTrace[node.data.depthId]}/>}
            </div>
        );
    }
}

CallTraceFlameGraph.propTypes = {
    callTrace: PropTypes.instanceOf(CallTrace).isRequired,
    transaction: PropTypes.instanceOf(Transaction).isRequired,
};

export default CallTraceFlameGraph;
