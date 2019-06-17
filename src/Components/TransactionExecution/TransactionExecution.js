import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {PanelHeader, PanelContent, Panel, PanelTabs} from "../../Elements";

import {CallTracePreview, StackTracePreview} from "../index";

const EXECUTION_TABS = [
    {
        label: "Stack Trace",
        value: 'stack_trace',
    },
    {
        label: "Call Trace",
        value: 'call_trace',
    },
];

class TransactionExecution extends Component {
    constructor(props) {
        super(props);

        const {transaction} = props;

        this.state = {
            currentTab: transaction.status ? 'call_trace' : 'stack_trace',
        };
    }

    handleTabChange = (value) => {
        this.setState({
            currentTab: value,
        });
    };

    render() {
        const {transaction, callTrace, stackTrace, contract} = this.props;
        const {currentTab} = this.state;

        return (
            <Panel className="TransactionExecution">
                {transaction.status && <PanelHeader>
                    <h3>Call Trace</h3>
                </PanelHeader>}
                {!transaction.status && <PanelTabs tabs={EXECUTION_TABS} active={currentTab} onChange={this.handleTabChange}/>}
                <PanelContent>
                    {currentTab === 'call_trace' && <CallTracePreview callTrace={callTrace} contract={contract}/>}
                    {currentTab === 'stack_trace' && !!stackTrace && <StackTracePreview stackTrace={stackTrace} contract={contract}/>}
                </PanelContent>
            </Panel>
        );
    }
}

PropTypes.propTypes = {
    callTrace: PropTypes.object.isRequired,
    stackTrace: PropTypes.object,
    transaction: PropTypes.object.isRequired,
    contract: PropTypes.object.isRequired,
};

export default TransactionExecution;
