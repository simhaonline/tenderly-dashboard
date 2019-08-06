import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import {FeatureFlagTypes} from "../../Common/constants";

import {PanelContent, Panel, PanelTabs} from "../../Elements";
import {CallTracePreview, StackTracePreview, TraceDebugger, TransactionGasBreakdown, TransactionContracts} from "../index";

class TransactionExecution extends Component {
    constructor(props) {
        super(props);

        const {transaction} = props;

        const tabs = [
            {
                label: "Overview",
                value: 'overview',
            },
            {
                label: "Contracts",
                value: 'contracts',
                featureFlag: FeatureFlagTypes.COMING_SOON,
            },
            {
                label: "Debugger",
                value: 'debugger',
                featureFlag: FeatureFlagTypes.DEBUGGER,
            },
            {
                label: "Gas Breakdown",
                value: 'gas_breakdown',
                featureFlag: FeatureFlagTypes.DEBUGGER,
            },
        ];

        if (!transaction.status) {
            tabs.unshift({
                label: "Stack Trace",
                value: "error",
                tagLabel: "Error",
                tagColor: "danger",
            })
        }

        this.state = {
            currentTab: transaction.status ? 'overview' : 'error',
            tabs,
        };
    }

    handleTabChange = (value, selectedTrace) => {
        this.setState({
            currentTab: value,
            selectedTrace,
        });
    };

    handleTraceViewInDebugger = (trace) => {
        this.handleTabChange('debugger', trace)
    };

    render() {
        const {callTrace, stackTrace, contracts, transaction} = this.props;
        const {currentTab, tabs, selectedTrace} = this.state;

        console.log(selectedTrace);


        return (
            <Fragment>
                <h2 className="MarginBottom2 MarginLeft2">Execution</h2>
                <Panel className="TransactionExecution">
                    <PanelTabs tabs={tabs} active={currentTab} onChange={tab => this.handleTabChange(tab)}/>
                    <PanelContent>
                        {currentTab === 'error' && !!stackTrace && <StackTracePreview stackTrace={stackTrace} contracts={contracts}/>}
                        {currentTab === 'overview' && <CallTracePreview callTrace={callTrace} contracts={contracts} onDebuggerView={this.handleTraceViewInDebugger}/>}
                        {currentTab === 'contracts' && <TransactionContracts contracts={contracts}/>}
                        {currentTab === 'debugger' && <TraceDebugger callTrace={callTrace} contracts={contracts} initialTrace={selectedTrace}/>}
                        {currentTab === 'gas_breakdown' && <TransactionGasBreakdown transaction={transaction} callTrace={callTrace}/>}
                    </PanelContent>
                </Panel>
            </Fragment>
        );
    }
}

PropTypes.propTypes = {
    callTrace: PropTypes.object.isRequired,
    stackTrace: PropTypes.object,
    transaction: PropTypes.object.isRequired,
    contracts: PropTypes.array.isRequired,
};

export default TransactionExecution;
