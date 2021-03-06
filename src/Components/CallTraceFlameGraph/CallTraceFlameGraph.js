import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import chroma from 'chroma-js';
import {Cell, Pie, PieChart, Tooltip} from "recharts";

import {CallTrace, Transaction} from "../../Core/models";

import {FlameGraph} from "../index";
import {FullWidthContainer, Panel, PanelContent} from "../../Elements";

import './CallTraceFlameGraph.scss';

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

    return <Panel>
        <PanelContent className="DisplayFlex">
            <div>
                <PieChart width={150} height={150}>
                    <Pie dataKey="gas" data={graphData} cx={75} cy={75} innerRadius={30} startAngle={450} endAngle={90} isAnimationActive={false} outerRadius={60}>
                        {graphData.map((entry, index) => <Cell key={`cell-${index}`} fill={colorScale(1 / (Math.max(graphData.length - 1, 1)) * index).hex()} stroke="#ADD3FF"/>)}
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
        </PanelContent>
    </Panel>;
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
    computeTraceToGraphChildren = (traces, parentGasLeft) => {
        if (!traces || !traces.length) {
            return null;
        }

        const data = [];

        let currentGasUsed = 0;

        traces.forEach(trace => {
            const gasDiff = parentGasLeft - trace.gasLeft - currentGasUsed;

            if (parentGasLeft && gasDiff > 0) {
                // data.push({
                //     name: `[HIDE]`,
                //     value: gasDiff,
                //     children: null,
                // });

                currentGasUsed += gasDiff;
            }

            currentGasUsed += trace.gasUsed;

            data.push({
                name: `${trace.functionName || trace.op} - ${trace.gasUsed.toLocaleString()} Gas`,
                value: trace.gasUsed,
                depthId: trace.depthId,
                children: this.computeTraceToGraphChildren(trace.calls, trace.gasLeft),
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
            name: `Total Gas - ${totalGas.toLocaleString()} Gas`,
            value: callTrace.trace.gasUsed + callTrace.initialGas,
            children: [
                {
                    name: `Actual Gas Used - ${transaction.gasUsed.toLocaleString()} Gas`,
                    value: transaction.gasUsed,
                    children: [
                        {
                            name: `Initial Gas - ${callTrace.initialGas.toLocaleString()} Gas`,
                            value: callTrace.initialGas,
                        },
                        ...this.computeTraceToGraphChildren([callTrace.trace]),
                    ],
                },
                {
                    name: `Refunded Gas - ${callTrace.refundedGas.toLocaleString()} Gas`,
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
                <FullWidthContainer>
                    <div className="CallTraceFlameGraph__GraphWrapper">
                        <FlameGraph onClick={this.handleTraceClick} data={graphData} stretch/>
                    </div>
                </FullWidthContainer>
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
