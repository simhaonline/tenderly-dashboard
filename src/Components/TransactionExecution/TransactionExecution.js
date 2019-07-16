import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import {FeatureFlagTypes} from "../../Common/constants";

import {PanelContent, Panel, PanelTabs, Toggle} from "../../Elements";
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

        this.state = {
            currentTab: 'overview',
            viewStackTrace: !transaction.status,
            tabs,
        };
    }

    handleTabChange = (value) => {
        this.setState({
            currentTab: value,
        });
    };

    handleViewStackTraceChange = () => {
        const {viewStackTrace} = this.state;

        this.setState({
            viewStackTrace: !viewStackTrace,
        });
    };

    render() {
        const {callTrace, stackTrace, contracts, transaction} = this.props;
        const {currentTab, tabs, viewStackTrace} = this.state;

        return (
            <Fragment>
                <h2 className="MarginBottom2 MarginLeft2">Execution</h2>
                <Panel className="TransactionExecution">
                    <PanelTabs tabs={tabs} active={currentTab} onChange={this.handleTabChange}/>
                    <PanelContent>
                        {currentTab === 'overview' && <div>
                            {!transaction.status && !!stackTrace && <div className="MarginBottom3 DisplayFlex">
                                <div className="DisplayFlex AlignItemsCenter">
                                    <Toggle value={viewStackTrace} onChange={this.handleViewStackTraceChange}/>
                                    <span className="MarginLeft1">View Stack Trace</span>
                                </div>
                            </div>}
                            {viewStackTrace && <StackTracePreview stackTrace={stackTrace} contracts={contracts}/>}
                            {!viewStackTrace && <CallTracePreview callTrace={callTrace} contracts={contracts}/>}
                        </div>}
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
