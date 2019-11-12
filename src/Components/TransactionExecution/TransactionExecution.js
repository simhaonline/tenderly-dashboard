import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, withRouter} from "react-router-dom";

import {getRouteSlugForNetwork} from "../../Utils/RouterHelpers";

import {EventLog, StateDiff} from "../../Core/models";

import {PanelContent, Panel} from "../../Elements";
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

class TransactionExecution extends Component {
    constructor(props) {
        super(props);

        const {transaction, project} = props;

        let baseUrl = '';

        if (project) {
            baseUrl = `/${project.owner}/${project.slug}`
        }

        baseUrl += `/tx/${getRouteSlugForNetwork(transaction.network)}/${transaction.txHash}`;

        this.state = {
            baseUrl,
        };
    }

    handleTabChange = (value, selectedTrace) => {
        const {baseUrl} = this.state;

        this.setState({
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
        const {selectedTrace, baseUrl} = this.state;

        return (
            <Fragment>
                <Panel className="TransactionExecution">
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
