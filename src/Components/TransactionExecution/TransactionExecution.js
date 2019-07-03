import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {FeatureFlagTypes} from "../../Common/constants";

import {PanelContent, Panel, PanelTabs} from "../../Elements";
import {CallTracePreview, StackTracePreview, TraceInspector} from "../index";

class TransactionExecution extends Component {
    constructor(props) {
        super(props);

        const {transaction} = props;

        const tabs = [
            {
                label: "Call Trace",
                value: 'call_trace',
            },
            {
                label: "Inspector",
                value: 'inspector',
                featureFlag: FeatureFlagTypes.DEBUGGER,
            },
        ];

        if (!transaction.status) {
            tabs.unshift({
                label: "Stack Trace",
                value: 'stack_trace',
            });
        }

        this.state = {
            currentTab: transaction.status ? 'call_trace' : 'stack_trace',
            tabs,
        };
    }

    handleTabChange = (value) => {
        this.setState({
            currentTab: value,
        });
    };

    render() {
        const {callTrace, stackTrace, contracts} = this.props;
        const {currentTab, tabs} = this.state;

        return (
            <Panel className="TransactionExecution">
                <PanelTabs tabs={tabs} active={currentTab} onChange={this.handleTabChange}/>
                <PanelContent>
                    {currentTab === 'stack_trace' && !!stackTrace && <StackTracePreview stackTrace={stackTrace} contracts={contracts}/>}
                    {currentTab === 'call_trace' && <CallTracePreview callTrace={callTrace} contracts={contracts}/>}
                    {currentTab === 'inspector' && <TraceInspector callTrace={callTrace} stackTrace={stackTrace} contracts={contracts}/>}
                </PanelContent>
            </Panel>
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
