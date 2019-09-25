import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {SimpleAlertRuleTypes, AlertRuleBuilderSteps} from "../../Common/constants";

import {AlertRule, Contract, NotificationDestination} from "../../Core/models";

import {Button, Icon} from "../../Elements";
import AlertRuleBuilderType from "./AlertRuleBuilderType";

import './AlertRuleBuilder.scss';

class AlertRuleBuilder extends Component {
    constructor(props) {
        super(props);

        const {initialStep, initialRule, skipGeneral} = props;

        console.log(initialRule);

        const selectedType = initialRule ? initialRule.simpleType : null;

        const steps = {
            [AlertRuleBuilderSteps.GENERAL]: {
                label: 'General Information',
                description: 'Some description for this tep',
                slug: AlertRuleBuilderSteps.GENERAL,
                enabled: !skipGeneral,
                completed: false,
            },
            [AlertRuleBuilderSteps.TYPE]: {
                label: 'Rule Type',
                description: this.getAlertTypeDescription(selectedType),
                slug: AlertRuleBuilderSteps.TYPE,
                enabled: true,
                completed: initialRule ? initialRule.simpleType !== SimpleAlertRuleTypes.UNSET : false,
            },
            [AlertRuleBuilderSteps.TARGET]: {
                label: 'Alert Target',
                description: 'Select contracts for which the alert will be triggered.',
                slug: AlertRuleBuilderSteps.TARGET,
                enabled: true,
                completed: false,
            },
            [AlertRuleBuilderSteps.PARAMETERS]: {
                label: 'Parameters',
                description: 'Set alert trigger parameters.',
                slug: AlertRuleBuilderSteps.PARAMETERS,
                enabled: false,
                completed: false,
            },
            [AlertRuleBuilderSteps.DESTINATIONS]: {
                label: 'Destinations',
                description: 'Select the destinations to which the alert notifications will be sent to.',
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
     * @param {SimpleAlertRuleTypes} type
     * @return {string}
     */
    getAlertTypeDescription = (type) => {
        switch (type) {
            case SimpleAlertRuleTypes.SUCCESSFUL_TX:
                return 'Alert every time a successful transaction happens.';
            case SimpleAlertRuleTypes.FAILED_TX:
                return 'Alert every time a transaction failed.';
            case SimpleAlertRuleTypes.WHITELISTED_CALLERS:
                return 'Alert whenever a not whitelisted address calls a contract.';
            case SimpleAlertRuleTypes.BLACKLISTED_CALLERS:
                return 'Alert whenever a blacklisted address calls a contract.';
            case SimpleAlertRuleTypes.FUNCTION_CALLED:
                return 'Alert whenever a function is called inside a transaction.';
            case SimpleAlertRuleTypes.LOG_EMITTED:
                return 'Alert whenever an event / log is emitted inside a transaction.';
            default:
                return 'Select an alert trigger type.';
        }
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
            description: this.getAlertTypeDescription(type),
        }));
    };

    render() {
        const {submitButtonLabel} = this.props;
        const {step: activeStep, selectedType, steps} = this.state;

        return (
            <div className="AlertRuleBuilder">
                {Object.values(steps).filter(step => step.enabled).map((step, index) => <div key={step.slug}>
                    <div className={classNames(
                        "AlertRuleBuilder__StepHeader",
                        {
                            "AlertRuleBuilder__StepHeader--Finished": step.complete,
                        },
                    )} onClick={() => this.handleStepOpen(step.slug)}>
                        <div className={classNames(
                            "AlertRuleBuilder__StepIcon",
                            {
                                "AlertRuleBuilder__StepIcon--Finished": step.completed,
                            },
                        )}>
                            {!step.completed && <span>{index + 1}</span>}
                            {step.completed && <Icon icon="check"/>}
                        </div>
                        <div className="AlertRuleBuilder__StepInfo">
                            <h5 className="AlertRuleBuilder__StepInfo__Heading">{step.label}</h5>
                            <p className="AlertRuleBuilder__StepInfo__Description">{step.description}</p>
                        </div>
                    </div>
                    {step.slug === activeStep && <div className="AlertRuleBuilder__Body">
                        <div className="AlertRuleBuilder__Body__Divider"/>
                        <div className="AlertRuleBuilder__Body__Content">
                            {step.slug === AlertRuleBuilderSteps.TYPE && <AlertRuleBuilderType onSelect={this.handleAlertTypeSelect} value={selectedType}/>}
                        </div>
                    </div>}
                </div>)}
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
