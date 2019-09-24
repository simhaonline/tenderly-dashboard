import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {AlertRule, Contract, NotificationDestination} from "../../Core/models";

import {Button, Icon} from "../../Elements";

import './AlertRuleBuilder.scss';

const AlertRuleBuilderSteps = {
    GENERAL: 'general',
    TYPE: 'type',
    TARGET: 'target',
    PARAMETERS: 'parameters',
    DESTINATIONS: 'destinations',
};

class AlertRuleBuilder extends Component {
    constructor(props) {
        super(props);

        const {initialStep, initialRule, skipGeneral} = props;

        console.log(initialRule);

        this.state = {
            step: props.initialStep,
            steps: {
                [AlertRuleBuilderSteps.GENERAL]: {
                    label: 'General Information',
                    description: 'Some description for this tep',
                    slug: AlertRuleBuilderSteps.GENERAL,
                    enabled: !skipGeneral,
                    completed: false,
                },
                [AlertRuleBuilderSteps.TYPE]: {
                    label: 'Alert Type',
                    description: 'Some description for this tep',
                    slug: AlertRuleBuilderSteps.TYPE,
                    enabled: true,
                    completed: false,
                },
                [AlertRuleBuilderSteps.TARGET]: {
                    label: 'Alert Target',
                    description: 'Some description for this tep',
                    slug: AlertRuleBuilderSteps.TARGET,
                    enabled: true,
                    completed: false,
                },
                [AlertRuleBuilderSteps.PARAMETERS]: {
                    label: 'Parameters',
                    description: 'Some description for this tep',
                    slug: AlertRuleBuilderSteps.PARAMETERS,
                    enabled: false,
                    completed: false,
                },
                [AlertRuleBuilderSteps.DESTINATIONS]: {
                    label: 'Destinations',
                    description: 'Some description for this tep',
                    slug: AlertRuleBuilderSteps.DESTINATIONS,
                    enabled: true,
                    completed: false,
                },
            }
        };
    }

    render() {
        const {submitButtonLabel} = this.props;
        const {step: activeStep, steps} = this.state;

        return (
            <div className="AlertRuleBuilder">
                {Object.values(steps).filter(step => step.enabled).map((step, index) => <div key={step.slug}>
                    <div className={classNames(
                        "AlertRuleBuilder__StepHeader",
                        {
                            "AlertRuleBuilder__StepHeader--Finished": step.complete,
                        },
                    )}>
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
                    {step.slug === activeStep && <div className="SimpleAlertRuleStep__Body">
                        <div className="SimpleAlertRuleStep__Body__Divider"/>
                        <div className="SimpleAlertRuleStep__Body__Content">
                            qwe
                        </div>
                    </div>}
                </div>)}
                <div className="MarginTop4">
                    <Button>
                        <span>{submitButtonLabel}</span>
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
