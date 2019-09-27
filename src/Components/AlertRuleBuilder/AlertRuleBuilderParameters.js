import React, {PureComponent} from 'react';

import {SimpleAlertRuleTargetTypes, SimpleAlertRuleTypes} from "../../Common/constants";

import {simpleAlertTypeRequiresContract} from "../../Utils/AlertHelpers";

import {Select} from "../../Elements";
import {SimpleLoader} from "..";

import AlertRuleBuilderStep from "./AlertRuleBuilderStep";

class OptionBuilder extends PureComponent {
    render() {
        const {value, options, onChange} = this.props;

        return (
            <div>
                <Select value={value} options={options} onChange={onChange} getOptionLabel={option => option.name} getOptionValue={option => option.id}/>
            </div>
        );
    }
}

class OptionParameterBuilder extends PureComponent {
    render() {
        return (
            <div>
                funct param
            </div>
        );
    }
}

class AlertRuleBuilderParameters extends PureComponent {
    isStepCompleted = () => {
        const {value} = this.props;

        return !!value;
    };

    getStepDescription = () => {
        const {value, alertTarget, alertType} = this.props;

        const type = value ? alertType : null;

        switch (type) {
            case SimpleAlertRuleTypes.LOG_EMITTED:
                return `Event / Log ${value.name} is emitted in ${alertTarget ? alertTarget.data.name : ''}`;
            case SimpleAlertRuleTypes.FUNCTION_CALLED:
                return `Function ${value.name}() is called in ${alertTarget ? alertTarget.data.name : ''}`;
            default:
                return 'Set alert trigger parameters.';
        }
    };

    render() {
        const {alertType, alertTarget, onToggle, number, isActiveStep, loading, value, options, onChange} = this.props;

        const requiresContract = simpleAlertTypeRequiresContract(alertType);

        const loaded = loading === false;

        const isContractTarget = !(!alertTarget || !alertTarget.data || alertTarget.type !== SimpleAlertRuleTargetTypes.CONTRACT);

        return (
            <AlertRuleBuilderStep number={number} onToggle={onToggle} label="Parameters"
                                  description={this.getStepDescription()} open={isActiveStep} completed={this.isStepCompleted()}>
                {requiresContract && <div>
                    {!isContractTarget && <div>
                        Please select a contract first
                    </div>}
                    {isContractTarget && !loaded && <div>
                        <SimpleLoader/>
                    </div>}
                    {isContractTarget && loaded && <div>
                        {[SimpleAlertRuleTypes.LOG_EMITTED, SimpleAlertRuleTypes.FUNCTION_CALLED].includes(alertType) &&
                            <OptionBuilder value={value} options={options} onChange={option => onChange(alertType, option)}/>
                        }
                    </div>}
                </div>}
                {!requiresContract && <div>
                    select based on type
                </div>}
            </AlertRuleBuilderStep>
        );
    }
}

AlertRuleBuilderParameters.propTypes = {};

export default AlertRuleBuilderParameters;
