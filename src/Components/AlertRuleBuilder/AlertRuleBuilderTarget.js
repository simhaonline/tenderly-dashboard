import React, {Component} from 'react';

import AlertRuleBuilderStep from "./AlertRuleBuilderStep";
import AlertRuleBuilderOption from "./AlertRuleBuilderOption";

class AlertRuleBuilderTarget extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    isStepCompleted = () => {
        const {value} = this.props;

        return !!value;
    };

    render() {
        const {onSelect, value, onToggle, number, isActiveStep} = this.props;

        return (
            <AlertRuleBuilderStep number={number} onToggle={onToggle} label="Alert Target"
                                  description="No description" open={isActiveStep} completed={this.isStepCompleted()}>
                <div className="AlertRuleBuilderTarget AlertRuleBuilderOptionsWrapper">
                    <AlertRuleBuilderOption onClick={onSelect} selected={value === 'contract'}
                                            icon="file-text" label="Contract" description="Receive alerts for only one contract"/>
                    <AlertRuleBuilderOption onClick={onSelect} selected={value === 'project'}
                                            icon="project" label="Project" description="Receive alerts for every contract in this project"/>
                </div>
            </AlertRuleBuilderStep>
        );
    }
}

AlertRuleBuilderTarget.propTypes = {};

export default AlertRuleBuilderTarget;
