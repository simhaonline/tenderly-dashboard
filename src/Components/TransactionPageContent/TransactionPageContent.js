import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, withRouter} from "react-router-dom";

import {getRouteSlugForNetwork} from "../../Utils/RouterHelpers";

import {EventLog, StateDiff, Transaction, Project} from "../../Core/models";

import {
    CallTracePreview, TraceDebugger, TransactionContracts,
    TransactionEventLogs,
    TransactionGasBreakdown,
    TransactionGeneralInformation,
    TransactionStackTrace, TransactionStateDiff, TransactionConsoleLogs,
} from "../index";

const tabToUrlMap = {
    overview: '',
    events: '/logs',
    contracts: '/contracts',
    debugger: '/debugger',
    gas_breakdown: '/gas-usage',
    error: '/error',
    state_change: '/state-diff'
};

class TransactionPageContent extends PureComponent {
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

        this.state = {
            action: null,
            baseUrl,
        };
    }

    handleNavigationAction = (action) => {
        this.setState({
            action,
        });
    };

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
        const {action} = this.state;
        const {action: prevAction} = prevState;

        if (action !== prevAction) {
            this.handleTabChange(action.tab, action.trace);
        }
    }

    render() {
        const {transaction, stateDiffs, contracts, callTrace, eventLogs, stackTrace, project, consoleLogs} = this.props;
        const {baseUrl, selectedTrace} = this.state;

        if (!transaction) {
            return null;
        }

        return (
            <div className="TransactionPageContent">
                <Switch>
                    <Route path={baseUrl} exact render={() => <Fragment>
                        <TransactionGeneralInformation contracts={contracts} transaction={transaction} project={project}/>
                        {!transaction.status && !!stackTrace && <TransactionStackTrace onNavigate={this.handleNavigationAction} stackTrace={stackTrace} contracts={contracts}/>}
                        {!!consoleLogs && consoleLogs.length>0 && <TransactionConsoleLogs consoleLogs={consoleLogs} contracts={contracts} />}
                        <CallTracePreview callTrace={callTrace} contracts={contracts} onDebuggerView={this.handleTraceViewInDebugger} onSourceView={this.handleTraceViewSource}/>
                    </Fragment>}/>
                    <Route path={`${baseUrl}/logs`} exact render={() => <TransactionEventLogs contracts={contracts} eventLogs={eventLogs}/>}/>
                    <Route path={`${baseUrl}/contracts`} exact render={routeProps => <TransactionContracts {...routeProps} contracts={contracts} initialTrace={selectedTrace}/>}/>
                    <Route path={`${baseUrl}/debugger`} exact render={routeProps => <TraceDebugger {...routeProps} callTrace={callTrace} contracts={contracts} initialTrace={selectedTrace}/>}/>
                    <Route path={`${baseUrl}/state-diff`} exact render={() => <TransactionStateDiff contracts={contracts} stateDiffs={stateDiffs}/>}/>
                    <Route path={`${baseUrl}/gas-usage`} exact render={routeProps => <TransactionGasBreakdown {...routeProps} transaction={transaction} callTrace={callTrace}/>}/>
                </Switch>
            </div>
        )
    }
}

TransactionPageContent.propTypes = {
    transaction: PropTypes.instanceOf(Transaction).isRequired,
    contracts: PropTypes.array.isRequired,
    callTrace: PropTypes.object.isRequired,
    eventLogs: PropTypes.arrayOf(PropTypes.instanceOf(EventLog)),
    stateDiffs: PropTypes.arrayOf(PropTypes.instanceOf(StateDiff)),
    stackTrace: PropTypes.object,
    project: PropTypes.instanceOf(Project),
};

export default withRouter(TransactionPageContent);
