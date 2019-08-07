import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import {FeatureFlagTypes, NetworkAppToRouteTypeMap} from "../../Common/constants";

import {PanelContent, Panel, PanelTabs} from "../../Elements";
import {CallTracePreview, StackTracePreview, TraceDebugger, TransactionGasBreakdown, TransactionContracts} from "../index";
import {Route, Switch, withRouter} from "react-router-dom";

const tabToUrlMap = {
    overview: '',
    contracts: '/contracts',
    debugger: '/debugger',
    gas_breakdown: '/gas-usage',
    error: '/error',
};

const UrlToTabMap = {
    "contracts": 'contracts',
    "debugger": 'debugger',
    "gas-usage": 'gas_breakdown',
    "error": 'error',
};

class TransactionExecution extends Component {
    constructor(props) {
        super(props);

        const {transaction, projectId, match: {params: {tab}}} = props;

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

        let baseUrl = '';

        if (projectId) {
            baseUrl = `/project/${projectId}`
        }

        baseUrl += `/tx/${NetworkAppToRouteTypeMap[transaction.network]}/${transaction.txHash}`;

        this.state = {
            currentTab: tab ? UrlToTabMap[tab] : 'overview',
            tabs,
            baseUrl,
        };
    }

    handleTabChange = (value, selectedTrace) => {
        const {baseUrl} = this.state;

        this.setState({
            currentTab: value,
            selectedTrace,
        });

        this.props.history.push(`${baseUrl}${tabToUrlMap[value]}`);
    };

    handleTraceViewInDebugger = (trace) => {
        this.handleTabChange('debugger', trace)
    };

    render() {
        const {callTrace, stackTrace, contracts, transaction} = this.props;
        const {currentTab, tabs, selectedTrace, baseUrl} = this.state;

        return (
            <Fragment>
                <h2 className="MarginBottom2 MarginLeft2">Execution</h2>
                <Panel className="TransactionExecution">
                    <PanelTabs tabs={tabs} active={currentTab} onChange={tab => this.handleTabChange(tab)}/>
                    <PanelContent>
                        <Switch>
                            <Route path={baseUrl} exact render={() => <CallTracePreview callTrace={callTrace} contracts={contracts} onDebuggerView={this.handleTraceViewInDebugger}/>}/>
                            <Route path={`${baseUrl}/error`} exact render={() => <StackTracePreview stackTrace={stackTrace} contracts={contracts}/>}/>
                            <Route path={`${baseUrl}/contracts`} exact render={() => <TransactionContracts contracts={contracts}/>}/>
                            <Route path={`${baseUrl}/debugger`} exact render={() => <TraceDebugger callTrace={callTrace} contracts={contracts} initialTrace={selectedTrace}/>}/>
                            <Route path={`${baseUrl}/gas-usage`} exact render={() => <TransactionGasBreakdown transaction={transaction} callTrace={callTrace}/>}/>
                        </Switch>
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

export default withRouter(TransactionExecution);
