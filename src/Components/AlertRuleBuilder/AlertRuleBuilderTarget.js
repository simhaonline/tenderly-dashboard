import React, {Component} from 'react';

import {simpleAlertTypeRequiresContract} from "../../Utils/AlertHelpers";

import AlertRuleBuilderStep from "./AlertRuleBuilderStep";
import AlertRuleBuilderOption from "./AlertRuleBuilderOption";

import {Select} from "../../Elements";
import {ContractSelectOption} from "../index";

class AlertRuleBuilderTarget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPicker: null,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const {value, alertType} = this.props;
        const {alertType: prevAlertType} = prevProps;

        if (alertType !== prevAlertType && !value) {
            this.setState({
                currentPicker: null,
            });
        }
    }

    isStepCompleted = () => {
        const {value} = this.props;

        return !!value && (value.type === 'project' || !!value.value);
    };

    displayPicker = (type) => {
        this.setState({
            currentPicker: type,
        });
    };

    handlePickerOptionSelect = (type) => {
        const {onSelect} = this.props;

        this.displayPicker(type);

        onSelect({
            type,
        });
    };

    handleContractSelect = (contract) => {
        const {onSelect} = this.props;

        onSelect({
            type: 'contract',
            value: contract,
        });
    };

    handleProjectSelect = () => {
        const {onSelect} = this.props;

        this.displayPicker(null);

        onSelect({
            type: 'project',
        });
    };

    render() {
        const {alertType, value, onToggle, number, isActiveStep, contracts} = this.props;
        const {currentPicker} = this.state;

        return (
            <AlertRuleBuilderStep number={number} onToggle={onToggle} label="Alert Target"
                                  description="No description" open={isActiveStep} completed={this.isStepCompleted()}>
                <div className="AlertRuleBuilderTarget AlertRuleBuilderOptionsWrapper">
                    <AlertRuleBuilderOption onClick={() => this.handlePickerOptionSelect('contract')} selected={value && (value.type === 'contract' || currentPicker === 'contract')}
                                            icon="file-text" label="Contract" description="Receive alerts for only one contract"/>
                    <AlertRuleBuilderOption onClick={() => this.handlePickerOptionSelect('network')} selected={value && (value.type === 'network' || currentPicker === 'network')} disabled={simpleAlertTypeRequiresContract(alertType)}
                                            icon="layers" label="Network" description="Receive alerts for contracts deployed on a network"/>
                    <AlertRuleBuilderOption onClick={this.handleProjectSelect} selected={value && value.type === 'project' && !currentPicker} disabled={simpleAlertTypeRequiresContract(alertType)}
                                            icon="project" label="Project" description="Receive alerts for every contract in this project"/>
                </div>
                {!!currentPicker && <div>
                    {currentPicker === 'contract' && <Select value={value ? value.value : null} components={{
                        Option: ContractSelectOption,
                    }} onChange={this.handleContractSelect} options={contracts.map(contract => ({
                        value: contract.getUniqueId(),
                        network: contract.network,
                        address: contract.address,
                        label: contract.name,
                    }))}/>}
                </div>}
            </AlertRuleBuilderStep>
        );
    }
}

AlertRuleBuilderTarget.propTypes = {};

export default AlertRuleBuilderTarget;
