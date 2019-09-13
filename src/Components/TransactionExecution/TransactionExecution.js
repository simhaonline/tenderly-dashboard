import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, withRouter} from "react-router-dom";

import {EventLog, StateDiff} from "../../Core/models";

import {NetworkAppToRouteTypeMap} from "../../Common/constants";

import {PanelContent, Panel, PanelTabs} from "../../Elements";
import {CallTracePreview, TraceDebugger, TransactionEventLogs, TransactionGasBreakdown, TransactionContracts, TransactionStateDiff} from "../index";

const tabToUrlMap = {
    overview: '',
    events: '/logs',
    contracts: '/contracts',
    debugger: '/debugger',
    gas_breakdown: '/gas-usage',
    error: '/error',
    state_change: '/state-diff'
};

const UrlToTabMap = {
    "contracts": 'contracts',
    "debugger": 'debugger',
    "gas-usage": 'gas_breakdown',
    "error": 'error',
    "logs": 'events',
    "state-diff": 'state_change'
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
                label: "Events / Logs",
                value: 'events',
            },
            {
                label: "Contracts",
                value: 'contracts',
            },
            {
                label: "Debugger",
                value: 'debugger',
            },
            {
                label: "State Changes",
                value: 'state_change',
            },
            {
                label: "Gas Breakdown",
                value: 'gas_breakdown',
            },
        ];

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
        this.handleTabChange('debugger', trace);
    };

    handleTraceViewSource = (trace) => {
        this.handleTabChange('contracts', trace);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {action} = this.props;
        const {action: prevAction} = prevProps;

        if (action !== prevAction) {
            this.handleTabChange(action.tab, action.trace);
        }
    }

    render() {
        const {callTrace, contracts, transaction, eventLogs, stateDiffs} = this.props;
        const {currentTab, tabs, selectedTrace, baseUrl} = this.state;

        return (
            <Fragment>
                <h2 className="MarginBottom2 MarginLeft2">Execution</h2>
                <Panel className="TransactionExecution">
                    <PanelTabs tabs={tabs} active={currentTab} onChange={tab => this.handleTabChange(tab)}/>
                    <PanelContent>
                        <Switch>
                            <Route path={baseUrl} exact render={() => <CallTracePreview callTrace={callTrace} contracts={contracts} onDebuggerView={this.handleTraceViewInDebugger} onSourceView={this.handleTraceViewSource}/>}/>
                            <Route path={`${baseUrl}/logs`} exact render={() => <TransactionEventLogs contracts={contracts} eventLogs={eventLogs}/>}/>
                            <Route path={`${baseUrl}/contracts`} exact render={() => <TransactionContracts contracts={contracts} initialTrace={selectedTrace}/>}/>
                            <Route path={`${baseUrl}/debugger`} exact render={() => <TraceDebugger callTrace={callTrace} contracts={contracts} initialTrace={selectedTrace}/>}/>
                            <Route path={`${baseUrl}/state-diff`} exact render={() => <TransactionStateDiff contracts={contracts} stateDiffs={stateDiffs}/>}/>
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
    transaction: PropTypes.object.isRequired,
    contracts: PropTypes.array.isRequired,
    eventLogs: PropTypes.arrayOf(PropTypes.instanceOf(EventLog)),
    stateDiffs: PropTypes.arrayOf(PropTypes.instanceOf(StateDiff)),
};

export default withRouter(TransactionExecution);
