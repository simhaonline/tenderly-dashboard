import React, {Component} from 'react';
import PropTypes from "prop-types";

import {Input, TextArea} from '../../Elements';

import AlertRuleBuilderStep from "./AlertRuleBuilderStep";

class AlertRuleBuilderGeneralInformation extends Component {
    handleInputChange = (field, value) => {
        const {onChange} = this.props;

        onChange(value, field);
    };

    /**
     * @return {boolean}
     */
    isStepCompleted = () => {
        const {data} = this.props;

        return !!data.alertName;
    };

    getStepDescription = () => {
        const {data} = this.props;

        if (!data || !data.alertName) {
            return 'Set alert name and description';
        }

        return `Name: ${data.alertName}`;
    };

    render() {
        const {data, onToggle, number, isActiveStep} = this.props;

        return (
            <AlertRuleBuilderStep number={number} onToggle={onToggle} label="General Information"
                                  description={this.getStepDescription()} open={isActiveStep} completed={this.isStepCompleted()}>
                <Input field="alertName" onChange={this.handleInputChange} value={data.alertName} placeholder="Set alert name"/>
                <TextArea field="alertDescription" onChange={this.handleInputChange} value={data.alertDescription}
                          placeholder="Set description for this alert" className="MarginBottom4"/>
            </AlertRuleBuilderStep>
        );
    }
}

AlertRuleBuilderGeneralInformation.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default AlertRuleBuilderGeneralInformation;