import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Analytics from "../../Utils/Analytics";
import {simpleAlertTypeRequiresParameters} from "../../Utils/AlertHelpers";

import {SimpleAlertRuleTypes, AlertRuleBuilderSteps} from "../../Common/constants";

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

        this.state = {
            step: initialStep,
            selectedType,
            expressions: [],
            stepsEnabled,
        };
    }

    /**
     * @param {AlertRuleBuilderSteps} step
     */
    handleStepOpen = (step) => {
        this.setState({
            step,
        });
    };

    /**
     * @param {object} data
     */
    updateStepsEnabled = (data) => {
        const {stepsEnabled} = this.state;

        this.setState({
            stepsEnabled: {
                ...stepsEnabled,
                ...data,
            },
        });
    };

    /**
     * @param {SimpleAlertRuleTypes} type
     */
    handleAlertTypeSelect = (type) => {
        Analytics.trackEvent('simple_alert_form_select_alert_type', {
            type: type,
        });

        this.setState({
            selectedType: type,
            selectedTarget: null,
            parameters: null,
        }, () => this.updateStepsEnabled({
            [AlertRuleBuilderSteps.PARAMETERS]: simpleAlertTypeRequiresParameters(type),
            [AlertRuleBuilderSteps.TARGET]: type !== SimpleAlertRuleTypes.ADVANCED,
            [AlertRuleBuilderSteps.ADVANCED]: type === SimpleAlertRuleTypes.ADVANCED,
        }));
    };

    render() {
        const {submitButtonLabel, contracts} = this.props;
        const {step: activeStep, selectedType, stepsEnabled, expressions} = this.state;

        return (
            <div className="AlertRuleBuilder">
                {Object.keys(stepsEnabled).filter(step => stepsEnabled[step]).map((step, index) => {
                    const commonProps = {
                        key: step,
                        onToggle: () => this.handleStepOpen(step),
                        isActiveStep: activeStep === step,
                        number: index + 1,
                    };

                    switch (step) {
                        case AlertRuleBuilderSteps.GENERAL:
                            return <AlertRuleBuilderGeneralInformation {...commonProps}/>;
                        case AlertRuleBuilderSteps.TYPE:
                            return <AlertRuleBuilderType {...commonProps} onSelect={this.handleAlertTypeSelect} value={selectedType}/>;
                        case AlertRuleBuilderSteps.TARGET:
                            return <AlertRuleBuilderTarget {...commonProps}/>;
                        case AlertRuleBuilderSteps.PARAMETERS:
                            return <AlertRuleBuilderParameters {...commonProps} expressions={expressions}/>;
                        case AlertRuleBuilderSteps.ADVANCED:
                            return <AlertRuleBuilderAdvanced {...commonProps} contracts={contracts} expressions={expressions}/>;
                        case AlertRuleBuilderSteps.DESTINATIONS:
                            return <AlertRuleBuilderDestinations {...commonProps}/>;
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
