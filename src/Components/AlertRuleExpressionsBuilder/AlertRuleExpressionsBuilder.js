import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Contract} from "../../Core/models";

import {Card} from "../../Elements";

import AlertRuleTypeSelect from "./AlertRuleTypeSelect";
import AlertRuleTargetSelect from "./AlertRuleTargetSelect";

import './AlertRuleExpressionsBuilder.scss';

const ParametersRequiredAlertTypes = [
    'method_call',
    'log_emitted',
    'whitelisted_caller',
    'blacklisted_caller',
];

class AlertRuleExpressionsBuilder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alertType: null,
            alertTarget: null,
        };
    }

    handleAlertTypeChange = (value) => {
        this.setState({
            alertType: value,
            alertTarget: null,
        });
    };

    handleAlertTargetChange = (value) => {
        this.setState({
            alertTarget: value,
        });
    };

    render() {
        const {alertType, alertTarget} = this.state;
        const {contracts} = this.props;

        const parametersRequired = !!alertType && ParametersRequiredAlertTypes.includes(alertType.value);

        return (
            <div className="AlertRuleExpressionsBuilder">
                <Card color="dark" className="AlertRuleExpressionsBuilder__Rule">
                    <AlertRuleTypeSelect value={alertType} onChange={this.handleAlertTypeChange}/>
                    {!!alertType && <AlertRuleTargetSelect value={alertTarget} onChange={this.handleAlertTargetChange} alertType={alertType} contracts={contracts}/>}
                    {!!alertTarget && parametersRequired && <div>
                        params required
                    </div>}
                </Card>
            </div>
        );
    }
}

AlertRuleExpressionsBuilder.propTypes = {
    contracts: PropTypes.arrayOf(PropTypes.instanceOf(Contract)).isRequired,
};

AlertRuleExpressionsBuilder.defaultProps = {
    onChange: () => {},
};

export default AlertRuleExpressionsBuilder;
