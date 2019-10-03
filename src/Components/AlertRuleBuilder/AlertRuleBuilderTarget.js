import React, {Component} from 'react';

import {simpleAlertTypeRequiresContract} from "../../Utils/AlertHelpers";
import {SimpleAlertRuleTargetTypes} from "../../Common/constants";

import AlertRuleBuilderStep from "./AlertRuleBuilderStep";
import AlertRuleBuilderOption from "./AlertRuleBuilderOption";

import {Select} from "../../Elements";
import {ContractSelectOption, NetworkSelectOption} from "../index";

class AlertRuleBuilderTarget extends Component {
    /**
     * @return {boolean}
     */
    isStepCompleted = () => {
        const {value} = this.props;

        return !!value && (value.type === SimpleAlertRuleTargetTypes.PROJECT || !!value.data);
    };

    /**
     * @return {string}
     */
    getStepDescription = () => {
        const {value, contracts, project} = this.props;

        const type = value ? value.type : null;

        switch (type) {
            case SimpleAlertRuleTargetTypes.CONTRACT:
                if (!value.data) return 'Select contract';

                return `Contract: ${value.data.name} (${value.data.address})`;
            case SimpleAlertRuleTargetTypes.NETWORK:
                if (!value.data) return 'Select network';

                return `All contract that have been deployed on ${value.data.name}`;
            case SimpleAlertRuleTargetTypes.PROJECT:
                return `All contracts in the ${project.slug} project (total of ${contracts.length} contracts)`;
            default:
                return 'Select contracts for which the alert will be triggered.'
        }
    };

    /**
     * @param {SimpleAlertRuleTargetTypes} type
     */
    handlePickerOptionSelect = (type) => {
        const {onSelect} = this.props;

        onSelect({
            type,
        });
    };

    /**
     * @param {Contract} contract
     */
    handleContractSelect = (contract) => {
        const {onSelect} = this.props;

        onSelect({
            type: SimpleAlertRuleTargetTypes.CONTRACT,
            data: contract,
        });
    };

    /**
     * @param {Network} network
     */
    handleNetworkSelect = (network) => {
        const {onSelect} = this.props;

        onSelect({
            type: SimpleAlertRuleTargetTypes.NETWORK,
            data: network,
        });
    };

    handleProjectSelect = () => {
        const {onSelect} = this.props;

        onSelect({
            type: SimpleAlertRuleTargetTypes.PROJECT,
        });
    };

    render() {
        const {alertType, value, onToggle, number, isActiveStep, contracts, networks} = this.props;

        const isContractOptionActive = value && value.type === SimpleAlertRuleTargetTypes.CONTRACT;
        const isNetworkOptionActive = value && value.type === SimpleAlertRuleTargetTypes.NETWORK;

        return (
            <AlertRuleBuilderStep number={number} onToggle={onToggle} label="Alert Target"
                                  description={this.getStepDescription()} open={isActiveStep} completed={this.isStepCompleted()}>
                <div className="AlertRuleBuilderTarget AlertRuleBuilderOptionsWrapper">
                    <AlertRuleBuilderOption onClick={() => this.handlePickerOptionSelect(SimpleAlertRuleTargetTypes.CONTRACT)}
                                            selected={isContractOptionActive}
                                            icon="file-text" label="Contract" description="Receive alerts for only one contract"/>
                    <AlertRuleBuilderOption onClick={() => this.handlePickerOptionSelect(SimpleAlertRuleTargetTypes.NETWORK)}
                                            selected={isNetworkOptionActive} disabled={simpleAlertTypeRequiresContract(alertType)}
                                            icon="layers" label="Network" description="Receive alerts for contracts deployed on a network"/>
                    <AlertRuleBuilderOption onClick={this.handleProjectSelect}
                                            selected={value && value.type === SimpleAlertRuleTargetTypes.PROJECT} disabled={simpleAlertTypeRequiresContract(alertType)}
                                            icon="project" label="Project" description="Receive alerts for every contract in this project"/>
                </div>
                {(isContractOptionActive || isNetworkOptionActive) && <div className="MarginBottom4">
                    {isContractOptionActive && <Select value={value ? value.data : null} getOptionLabel={contract => contract.name} getOptionValue={contract => contract.getUniqueId()} components={{
                        Option: ContractSelectOption,
                    }} selectLabel="Select contract" onChange={this.handleContractSelect} options={contracts}/>}
                    {isNetworkOptionActive && <Select value={value ? value.data : null} getOptionLabel={contract => contract.name} getOptionValue={contract => contract.id} components={{
                        Option: NetworkSelectOption,
                    }} selectLabel="Select network" onChange={this.handleNetworkSelect} options={networks}/>}
                </div>}
            </AlertRuleBuilderStep>
        );
    }
}

AlertRuleBuilderTarget.propTypes = {};

export default AlertRuleBuilderTarget;
