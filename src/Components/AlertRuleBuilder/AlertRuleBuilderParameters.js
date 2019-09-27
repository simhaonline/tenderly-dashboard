import React, {PureComponent} from 'react';

import {SimpleAlertRuleTargetTypes, SimpleAlertRuleTypes} from "../../Common/constants";

import {simpleAlertTypeRequiresContract} from "../../Utils/AlertHelpers";

import {SimpleLoader} from "..";
import AlertRuleBuilderStep from "./AlertRuleBuilderStep";

const FunctionBuilder = ({value, options}) => {
    return (
        <div>func</div>
    )
};

class FunctionParameterBuilder extends PureComponent {
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

        return !!value && !!value.data;
    };

    getStepDescription = () => {
        const {value, alertTarget} = this.props;

        const type = value ? value.type : null;

        switch (type) {
            case SimpleAlertRuleTypes.LOG_EMITTED:
                return `Event / Log ${value.data.name} is emitted in ${alertTarget ? alertTarget.data.name : ''}`;
            case SimpleAlertRuleTypes.FUNCTION_CALLED:
                return `Function ${value.data.name}() is called in ${alertTarget ? alertTarget.data.name : ''}`;
            default:
                return 'Set alert trigger parameters.';
        }
    };

    render() {
        const {alertType, alertTarget, onToggle, number, isActiveStep, loading, value, options} = this.props;

        const requiresContract = simpleAlertTypeRequiresContract(alertType);

        console.log(loading, value, options);

        const isContractTarget = !(!alertTarget || !alertTarget.data || alertTarget.type !== SimpleAlertRuleTargetTypes.CONTRACT);

        return (
            <AlertRuleBuilderStep number={number} onToggle={onToggle} label="Parameters"
                                  description={this.getStepDescription()} open={isActiveStep} completed={this.isStepCompleted()}>
                {requiresContract && <div>
                    {!isContractTarget && <div>
                        Please select a contract first
                    </div>}
                    {isContractTarget && loading && <div>
                        <SimpleLoader/>
                    </div>}
                    {isContractTarget && !loading && <div>
                        content loaded
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
