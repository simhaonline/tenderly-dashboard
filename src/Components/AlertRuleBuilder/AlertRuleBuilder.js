import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Analytics from "../../Utils/Analytics";
import {simpleAlertTypeRequiresParameters} from "../../Utils/AlertHelpers";

import {SimpleAlertRuleTypes, AlertRuleBuilderSteps, SimpleAlertRuleTargetTypes} from "../../Common/constants";

import {AlertRule, Contract, NotificationDestination} from "../../Core/models";

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

        const {initialStep, initialRule, skipGeneral} = props;

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
            selectedDestinations: initialRule ? initialRule.deliveryChannels : [],
            alertName: initialRule ? initialRule.name : '',
            alertDescription: initialRule ? initialRule.description : '',
            expressions: initialRule ? initialRule.expressions : [],
            stepsEnabled,
        };
    }

    /**
     * @param {AlertRuleBuilderSteps} step
     */
    openStep = (step) => {
        this.setState({
            step,
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
            parameters: null,
        }, () => this.updateStepsEnabled({
            [AlertRuleBuilderSteps.PARAMETERS]: simpleAlertTypeRequiresParameters(type),
            [AlertRuleBuilderSteps.TARGET]: !isAdvancedType,
            [AlertRuleBuilderSteps.ADVANCED]: isAdvancedType,
        }, () => this.openStep(isAdvancedType ? AlertRuleBuilderSteps.ADVANCED : AlertRuleBuilderSteps.TARGET)));
    };

    /**
     * @param {SimpleAlertRuleTarget} target
     */
    handleAlertTargetSelect = (target) => {
        const {selectedType} = this.state;

        this.setState({
            selectedTarget: target,
            parameters: null,
        }, () => {
            if (target.type !== SimpleAlertRuleTargetTypes.PROJECT && !target.data) {
                return;
            }

            this.openStep(simpleAlertTypeRequiresParameters(selectedType) ? AlertRuleBuilderSteps.PARAMETERS : AlertRuleBuilderSteps.DESTINATIONS)
        });
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

    render() {
        const {submitButtonLabel, contracts, networks, destinations} = this.props;
        const {step: activeStep, selectedType, selectedTarget, alertName, alertDescription, selectedDestinations, stepsEnabled, expressions} = this.state;

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
                            return <AlertRuleBuilderTarget {...commonProps} contracts={contracts} networks={networks} onSelect={this.handleAlertTargetSelect} alertType={selectedType} value={selectedTarget}/>;
                        case AlertRuleBuilderSteps.PARAMETERS:
                            return <AlertRuleBuilderParameters {...commonProps} expressions={expressions} alertTarget={selectedTarget} alertType={selectedType}/>;
                        case AlertRuleBuilderSteps.ADVANCED:
                            return <AlertRuleBuilderAdvanced {...commonProps} contracts={contracts} expressions={expressions}/>;
                        case AlertRuleBuilderSteps.DESTINATIONS:
                            return <AlertRuleBuilderDestinations {...commonProps} destinations={destinations} selected={selectedDestinations}
                                                                 alertType={selectedType} onSelect={this.handleAlertDestinationsSelect}/>;
                        default:
                            return null;
                    }
                })}
                <div className="MarginTop4">
                    <Button>
                        <span>{submitButtonLabel}</span>
                    </Button>
                    <Button outline>
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
    destinations: PropTypes.arrayOf(PropTypes.instanceOf(NotificationDestination)).isRequired,
    initialStep: PropTypes.oneOf([...Object.values(AlertRuleBuilderSteps), null]),
};

AlertRuleBuilder.defaultProps = {
    skipGeneral: false,
    submitButtonLabel: 'Save',
};

export default AlertRuleBuilder;
