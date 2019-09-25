import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {SimpleAlertRuleTypes, AlertRuleBuilderSteps} from "../../Common/constants";

import {AlertRule, Contract, NotificationDestination} from "../../Core/models";

import {Button} from "../../Elements";
import AlertRuleBuilderType from "./AlertRuleBuilderType";

import './AlertRuleBuilder.scss';

class AlertRuleBuilder extends Component {
    constructor(props) {
        super(props);

        const {initialStep, initialRule, skipGeneral} = props;

        const selectedType = initialRule ? initialRule.simpleType : null;

        const steps = {
            [AlertRuleBuilderSteps.GENERAL]: {
                slug: AlertRuleBuilderSteps.GENERAL,
                enabled: !skipGeneral,
                completed: false,
            },
            [AlertRuleBuilderSteps.TYPE]: {
                slug: AlertRuleBuilderSteps.TYPE,
                enabled: true,
                completed: initialRule ? initialRule.simpleType !== SimpleAlertRuleTypes.UNSET : false,
            },
            [AlertRuleBuilderSteps.TARGET]: {
                slug: AlertRuleBuilderSteps.TARGET,
                enabled: true,
                completed: false,
            },
            [AlertRuleBuilderSteps.PARAMETERS]: {
                slug: AlertRuleBuilderSteps.PARAMETERS,
                enabled: false,
                completed: false,
            },
            [AlertRuleBuilderSteps.DESTINATIONS]: {
                slug: AlertRuleBuilderSteps.DESTINATIONS,
                enabled: true,
                completed: false,
            },
        };

        this.state = {
            step: initialStep,
            selectedType,
            steps,
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
     * @param {AlertRuleBuilderSteps} step
     * @param {object} data
     */
    updateStep = (step, data) => {
        const {steps} = this.state;
        const previousState = steps[step];

        const nextState = Object.assign({}, previousState, data);

        this.setState({
            steps: {
                ...steps,
                [step]: nextState,
            },
        });
    };
    /**
     * @param {SimpleAlertRuleTypes} type
     */
    handleAlertTypeSelect = (type) => {
        this.setState({
            selectedType: type,
        }, () => this.updateStep(AlertRuleBuilderSteps.TYPE, {
            completed: type !== SimpleAlertRuleTypes.UNSET,
        }));
    };

    render() {
        const {submitButtonLabel} = this.props;
        const {step: activeStep, selectedType, steps} = this.state;

        return (
            <div className="AlertRuleBuilder">
                {Object.values(steps).filter(step => step.enabled).map((step, index) => {
                    switch (step.slug) {
                        case AlertRuleBuilderSteps.TYPE:
                            return <AlertRuleBuilderType key={step.slug} step={step} onToggle={this.handleStepOpen}
                                                         isActiveStep={activeStep === step.slug} number={index + 1}
                                                         onSelect={this.handleAlertTypeSelect} value={selectedType}/>;
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
