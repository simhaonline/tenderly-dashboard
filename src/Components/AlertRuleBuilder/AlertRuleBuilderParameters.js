import React, {Component} from 'react';

import AlertRuleBuilderStep from "./AlertRuleBuilderStep";
import {simpleAlertTypeRequiresParameters} from "../../Utils/AlertHelpers";

class AlertRuleBuilderParameters extends Component {
    constructor(props) {
        super(props);

        console.log('recon')
    }
    render() {
        const {alertType, alertTarget, onToggle, number, isActiveStep} = this.props;

        const requiresContract = simpleAlertTypeRequiresParameters(alertType);

        return (
            <AlertRuleBuilderStep number={number} onToggle={onToggle} label="Parameters"
                                  description="No description" open={isActiveStep} completed={false}>
                {!alertTarget && <div>
                    Please select a contract first
                </div>}
                {!!alertTarget && <div>
                    select based on type
                </div>}
            </AlertRuleBuilderStep>
        );
    }
}

AlertRuleBuilderParameters.propTypes = {};

export default AlertRuleBuilderParameters;
