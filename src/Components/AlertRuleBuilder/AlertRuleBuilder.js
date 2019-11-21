import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as _ from "lodash";

import Analytics from "../../Utils/Analytics";
import {
    generateAlertRuleExpressions,
    getSimpleAlertParametersForType,
    getSimpleAlertTarget, isValidValueForParameterType,
    simpleAlertTypeRequiresContract,
    simpleAlertTypeRequiresParameters
} from "../../Utils/AlertHelpers";

import {SimpleAlertRuleTypes, AlertRuleBuilderSteps, SimpleAlertRuleTargetTypes} from "../../Common/constants";

import {AlertRule, Contract, NotificationDestination, Project} from "../../Core/models";
import * as contractActions from '../../Core/Contract/Contract.actions';

import {Button} from "../../Elements";

import AlertRuleBuilderType from "./AlertRuleBuilderType";
import AlertRuleBuilderGeneralInformation from "./AlertRuleBuilderGeneralInformation";
import AlertRuleBuilderTarget from "./AlertRuleBuilderTarget";
import AlertRuleBuilderParameters from "./AlertRuleBuilderParameters";
import AlertRuleBuilderAdvanced from "./AlertRuleBuilderAdvanced";
import AlertRuleBuilderDestinations from "./AlertRuleBuilderDestinations";

import './AlertRuleBuilder.scss';

class AlertRuleBuilder extends Component {
    constructor(props) {
        super(props);

        const {initialStep, initialRule, skipGeneral, contracts, networks} = props;

        const selectedType = initialRule ? initialRule.simpleType : null;

        const stepsEnabled = {
            [AlertRuleBuilderSteps.GENERAL]: !skipGeneral,
            [AlertRuleBuilderSteps.TYPE]: true,
            [AlertRuleBuilderSteps.TARGET]: selectedType !== SimpleAlertRuleTypes.ADVANCED,
            [AlertRuleBuilderSteps.PARAMETERS]: simpleAlertTypeRequiresParameters(selectedType),
            [AlertRuleBuilderSteps.ADVANCED]: selectedType === SimpleAlertRuleTypes.ADVANCED,
            [AlertRuleBuilderSteps.DESTINATIONS]: true,
        };

        const step = skipGeneral ? AlertRuleBuilderSteps.TYPE : AlertRuleBuilderSteps.GENERAL;

        this.state = {
            step: initialStep || step,
            selectedType,
            selectedTarget: initialRule ? getSimpleAlertTarget(initialRule.expressions, contracts, networks) : null,
            selectedParameters: initialRule ? getSimpleAlertParametersForType(initialRule.simpleType, initialRule.expressions) : null,
            selectedDestinations: initialRule ? initialRule.deliveryChannels : [],
            alertName: initialRule ? initialRule.name : '',
            alertDescription: initialRule ? initialRule.description : '',
            expressions: initialRule ? initialRule.expressions : [],
            stepsEnabled,
        };
    }

    componentDidMount() {
        const {selectedType, selectedTarget} = this.state;

        this.fetchRequiredParameterOptions(selectedType, selectedTarget);
    }

    /**
     * @param {AlertRuleBuilderSteps} step
     */
    openStep = (step) => {
        const {step: currentStep} = this.state;

        this.setState({
            step: step === currentStep ? null : step,
        });
    };

    /**
     * @param {object} data
     * @param {Function} callback
     */
    updateStepsEnabled = (data, callback) => {
        const {stepsEnabled} = this.state;

        this.setState({
            stepsEnabled: {
                ...stepsEnabled,
                ...data,
            },
        }, callback);
    };

    /**
     * @param {string} value
     * @param {string} field
     */
    handleGeneralInfoUpdate = (value, field) => {
        this.setState({
            [field]: value,
        });
    };

    /**
     * @param {SimpleAlertRuleTypes} type
     */
    handleAlertTypeSelect = (type) => {
        Analytics.trackEvent('simple_alert_form_select_alert_type', {
            type: type,
        });

        const isAdvancedType = type === SimpleAlertRuleTypes.ADVANCED;

        this.setState({
            selectedType: type,
            selectedTarget: null,
            selectedParameters: null,
        }, () => this.updateStepsEnabled({
            [AlertRuleBuilderSteps.PARAMETERS]: simpleAlertTypeRequiresParameters(type),
            [AlertRuleBuilderSteps.TARGET]: !isAdvancedType,
            [AlertRuleBuilderSteps.ADVANCED]: isAdvancedType,
        }, () => this.openStep(isAdvancedType ? AlertRuleBuilderSteps.ADVANCED : AlertRuleBuilderSteps.TARGET)));
    };

    /**
     *
     * @param {Contract} contract
     */
    fetchMethodsForTarget = async (contract) => {
        const {contractActions, project} = this.props;

        const response = await contractActions.fetchMethodsForContract(project, contract.address, contract.network);

        if (response.success) {
            this.setState({
                parameterOptions: response.data,
            });
        }
    };

    /**
     *
     * @param {Contract} contract
     */
    fetchLogsForTarget = async (contract) => {
        const {contractActions, project} = this.props;

        const response = await contractActions.fetchLogsForContract(project, contract.address, contract.network);

        if (response.success) {
            this.setState({
                parameterOptions: response.data,
            });
        }
    };

    /**
     * @param {SimpleAlertRuleTypes} type
     * @param {SimpleAlertRuleTarget} target
     */
    fetchRequiredParameterOptions = async (type, target) => {
        if (!type || !target || !simpleAlertTypeRequiresParameters(type)) return;

        if (simpleAlertTypeRequiresContract(type) && (target.type !== SimpleAlertRuleTargetTypes.CONTRACT || !target.data)) return;

        this.setState({
            fetchingParameterOptions: true,
        });

        switch (type) {
            case SimpleAlertRuleTypes.FUNCTION_CALLED:
            case SimpleAlertRuleTypes.CALLED_FUNCTION_PARAMETER:
                await this.fetchMethodsForTarget(target.data);
                break;
            case SimpleAlertRuleTypes.LOG_EMITTED:
            case SimpleAlertRuleTypes.EMITTED_LOG_PARAMETER:
                await this.fetchLogsForTarget(target.data);
                break;
            default:
                break;
        }

        this.setState({
            fetchingParameterOptions: false,
        });
    };

    /**
     * @param {SimpleAlertRuleTarget} target
     */
    handleAlertTargetSelect = (target) => {
        const {selectedType} = this.state;

        this.fetchRequiredParameterOptions(selectedType, target);

        this.setState({
            selectedTarget: target,
            selectedParameters: null,
        }, () => {
            if (target.type !== SimpleAlertRuleTargetTypes.PROJECT && !target.data) {
                return;
            }

            this.openStep(simpleAlertTypeRequiresParameters(selectedType) ? AlertRuleBuilderSteps.PARAMETERS : AlertRuleBuilderSteps.DESTINATIONS)
        });
    };

    /**
     * @param {AlertRuleBuilderType} type
     * @param {(ContractMethod|ContractLog|ContractInputParameter)} option
     */
    handleAlertParametersChange = (type, option) => {
        switch(type) {
            case SimpleAlertRuleTypes.FUNCTION_CALLED:
            case SimpleAlertRuleTypes.LOG_EMITTED:
            case SimpleAlertRuleTypes.CALLED_FUNCTION_PARAMETER:
            case SimpleAlertRuleTypes.EMITTED_LOG_PARAMETER:
            case SimpleAlertRuleTypes.BLACKLISTED_CALLERS:
            case SimpleAlertRuleTypes.WHITELISTED_CALLERS:
                const data = _.pick(option, ['id', 'name', 'lineNumber', 'addresses', 'condition']);

                this.setState({
                    selectedParameters: data,
                });
                break;
            default:
                break;
        }
    };

    /**
     * @param {NotificationDestination} destination
     */
    handleAlertDestinationsSelect = (destination) => {
        const {selectedDestinations} = this.state;

        let destinations;

        if (selectedDestinations.includes(destination.id)) {
            destinations = selectedDestinations.filter(dest => dest !== destination.id);
        } else {
            destinations = [
                ...selectedDestinations,
                destination.id
            ];

            Analytics.trackEvent('simple_alert_form_select_alert_destination', {
                type: destination.type,
            });
        }

        this.setState({
            selectedDestinations: destinations,
        });
    };


    /**
     * @return {string}
     */
    getSimpleAlertRuleName = () => {
        const {project} = this.props;
        const {selectedType, selectedTarget, selectedParameters} = this.state;

        let message = '';

        switch (selectedType) {
            case SimpleAlertRuleTypes.SUCCESSFUL_TX:
                message = 'Successful transaction';
                break;
            case SimpleAlertRuleTypes.FAILED_TX:
                message = 'Failed transaction';
                break;
            case SimpleAlertRuleTypes.WHITELISTED_CALLERS:
                message = 'Transaction from non-whitelisted address';
                break;
            case SimpleAlertRuleTypes.BLACKLISTED_CALLERS:
                message = 'Transaction from blacklisted address';
                break;
            case SimpleAlertRuleTypes.FUNCTION_CALLED:
                message = `Function ${selectedParameters.name} called`;
                break;
            case SimpleAlertRuleTypes.LOG_EMITTED:
                message = `Event/Log ${selectedParameters.name} emitted`;
                break;
            case SimpleAlertRuleTypes.EMITTED_LOG_PARAMETER:
                message = `Event/Log argument in ${selectedParameters.name} matched`;
                break;
            case SimpleAlertRuleTypes.CALLED_FUNCTION_PARAMETER:
                message = `Function argument in ${selectedParameters.name} matched`;
                break;
            default:
                break;
        }

        if (selectedTarget.type === SimpleAlertRuleTargetTypes.PROJECT) {
            message += ` in ${project.slug}`;
        } else if (selectedTarget.type === SimpleAlertRuleTargetTypes.CONTRACT) {
            message += ` in ${selectedTarget.data.name}`;
        } else if (selectedTarget.type === SimpleAlertRuleTargetTypes.NETWORK) {
            message += ` on ${selectedTarget.data.name}`;
        }

        return message;
    };

    /**
     *
     * @returns {boolean}
     */
    isFormValid = () => {
        const {skipGeneral} = this.props;
        const {alertName, selectedType, selectedTarget, selectedParameters, selectedDestinations} = this.state;

        if (!skipGeneral && !alertName) return false;

        if (!selectedType) return false;

        if (!selectedTarget || (selectedTarget.type !== SimpleAlertRuleTargetTypes.PROJECT && !selectedTarget.data)) return false;

        if (!selectedDestinations || selectedDestinations.length === 0) return false;

        if (simpleAlertTypeRequiresParameters(selectedType)) {
            switch (selectedType) {
                case SimpleAlertRuleTypes.LOG_EMITTED:
                case SimpleAlertRuleTypes.FUNCTION_CALLED:
                    return !!selectedParameters && !!selectedParameters.id;
                case SimpleAlertRuleTypes.WHITELISTED_CALLERS:
                case SimpleAlertRuleTypes.BLACKLISTED_CALLERS:
                    return !!selectedParameters && !!selectedParameters.addresses && selectedParameters.addresses.length > 0;
                case SimpleAlertRuleTypes.CALLED_FUNCTION_PARAMETER:
                case SimpleAlertRuleTypes.EMITTED_LOG_PARAMETER:
                    return !!selectedParameters
                        && !!selectedParameters.condition
                        && !!selectedParameters.condition.value
                        && isValidValueForParameterType(selectedParameters.condition.value, selectedParameters.condition.type, selectedParameters.condition.nestedType);
                default:
                    return false;
            }
        }

        return true;
    };

    handleFormSubmit = () => {
        const {onSubmit, skipGeneral} = this.props;
        const {alertName, alertDescription, selectedType, selectedTarget, selectedParameters, selectedDestinations} = this.state;

        const expressions = generateAlertRuleExpressions(selectedType, selectedTarget, selectedParameters);

        onSubmit({
            name: skipGeneral ? this.getSimpleAlertRuleName() : alertName,
            description: alertDescription,
            simpleType: selectedType,
        }, expressions, selectedDestinations);
    };

    render() {
        const {submitButtonLabel, contracts, networks, project, destinations, onCancel} = this.props;
        const {step: activeStep, selectedType, selectedTarget, alertName, alertDescription, selectedDestinations, stepsEnabled, expressions, fetchingParameterOptions, parameterOptions, selectedParameters} = this.state;

        return (
            <div className="AlertRuleBuilder">
                {Object.keys(stepsEnabled).filter(step => stepsEnabled[step]).map((step, index) => {
                    const commonProps = {
                        key: step,
                        onToggle: () => this.openStep(step),
                        isActiveStep: activeStep === step,
                        number: index + 1,
                    };

                    switch (step) {
                        case AlertRuleBuilderSteps.GENERAL:
                            return <AlertRuleBuilderGeneralInformation {...commonProps} data={{alertName, alertDescription}} onChange={this.handleGeneralInfoUpdate}/>;
                        case AlertRuleBuilderSteps.TYPE:
                            return <AlertRuleBuilderType {...commonProps} onSelect={this.handleAlertTypeSelect} value={selectedType}/>;
                        case AlertRuleBuilderSteps.TARGET:
                            return <AlertRuleBuilderTarget {...commonProps} onSelect={this.handleAlertTargetSelect}
                                                           project={project} contracts={contracts} networks={networks}
                                                           alertType={selectedType} value={selectedTarget}/>;
                        case AlertRuleBuilderSteps.PARAMETERS:
                            return <AlertRuleBuilderParameters {...commonProps} loading={fetchingParameterOptions} onChange={this.handleAlertParametersChange}
                                                               options={parameterOptions} value={selectedParameters}
                                                               alertTarget={selectedTarget} alertType={selectedType}/>;
                        case AlertRuleBuilderSteps.ADVANCED:
                            return <AlertRuleBuilderAdvanced {...commonProps} contracts={contracts} expressions={expressions}/>;
                        case AlertRuleBuilderSteps.DESTINATIONS:
                            return <AlertRuleBuilderDestinations {...commonProps} destinations={destinations.filter(dest => dest.enabled)} selected={selectedDestinations}
                                                                 alertType={selectedType} project={project} onSelect={this.handleAlertDestinationsSelect}/>;
                        default:
                            return null;
                    }
                })}
                <div className="MarginTop4">
                    <Button disabled={!this.isFormValid()} onClick={this.handleFormSubmit}>
                        <span>{submitButtonLabel}</span>
                    </Button>
                    <Button outline onClick={onCancel}>
                        <span>Cancel</span>
                    </Button>
                </div>
            </div>
        );
    }
}

AlertRuleBuilder.propTypes = {
    initialRule: PropTypes.instanceOf(AlertRule),
    skipGeneral: PropTypes.bool,
    submitButtonLabel: PropTypes.string,
    contracts: PropTypes.arrayOf(PropTypes.instanceOf(Contract)).isRequired,
    project: PropTypes.instanceOf(Project).isRequired,
    destinations: PropTypes.arrayOf(PropTypes.instanceOf(NotificationDestination)).isRequired,
    initialStep: PropTypes.oneOf([...Object.values(AlertRuleBuilderSteps), null]),
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

AlertRuleBuilder.defaultProps = {
    skipGeneral: false,
    submitButtonLabel: 'Save',
};

const mapDispatchToProps = dispatch => {
    return {
        contractActions: bindActionCreators(contractActions, dispatch)
    }
};

export default connect(
    null,
    mapDispatchToProps,
)(AlertRuleBuilder);
