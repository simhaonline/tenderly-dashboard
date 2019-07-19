import React, {Component, Fragment} from 'react';
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
                label: "Overview",
                value: 'overview',
            },
            {
                label: "Debugger",
                value: 'debugger',
                featureFlag: FeatureFlagTypes.DEBUGGER,
            },
        ];

        if (!transaction.status) {
            tabs.unshift({
                label: "Error",
                value: "error",
                tagLabel: "Stack Trace",
                tagColor: "danger",
            })
        }

        this.state = {
            currentTab: transaction.status ? 'overview' : 'error',
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
            <Fragment>
                <h2 className="MarginBottom2 MarginLeft2">Execution</h2>
                <Panel className="TransactionExecution">
                    <PanelTabs tabs={tabs} active={currentTab} onChange={this.handleTabChange}/>
                    <PanelContent>
                        {currentTab === 'error' && !!stackTrace && <StackTracePreview stackTrace={stackTrace} contracts={contracts}/>}
                        {currentTab === 'overview' && <CallTracePreview callTrace={callTrace} contracts={contracts}/>}
                        {currentTab === 'debugger' && <TraceInspector callTrace={callTrace} stackTrace={stackTrace} contracts={contracts}/>}
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
