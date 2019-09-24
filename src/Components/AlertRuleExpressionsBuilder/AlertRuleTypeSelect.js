import React from 'react';
import {components} from "react-select";
import PropTypes from 'prop-types';

import {SimpleAlertRuleTypes} from "../../Common/constants";

import {Icon, Select} from "../../Elements";

const alertTypeOptions = [
    {
        label: 'Successful Transaction',
        value: SimpleAlertRuleTypes.SUCCESSFUL_TX,
        icon: 'check-circle',
    },
    {
        label: 'Failed Transaction',
        value: SimpleAlertRuleTypes.FAILED_TX,
        icon: 'x-circle',
    },
    {
        label: 'Function Call',
        value: SimpleAlertRuleTypes.FUNCTION_CALLED,
        icon: 'layers',
    },
    {
        label: 'Event Emitted',
        value: SimpleAlertRuleTypes.LOG_EMITTED,
        icon: 'bookmark',
    },
    {
        label: 'Function Argument',
        value: SimpleAlertRuleTypes.CALLED_FUNCTION_PARAMETER,
        icon: 'code',
    },
    {
        label: 'Event Argument',
        value: SimpleAlertRuleTypes.EMITTED_LOG_PARAMETER,
        icon: 'code',
    },
    {
        label: 'Whitelisted Caller',
        value: SimpleAlertRuleTypes.WHITELISTED_CALLERS,
        icon: 'eye',
    },
    {
        label: 'Blacklisted Caller',
        value: SimpleAlertRuleTypes.BLACKLISTED_CALLERS,
        icon: 'eye-off',
    },
];

function AlertTypeSelectOption(props) {
    const {data} = props;

    return (
        <components.Option {...props} className="AlertTypeSelectOption">
            <div className="AlertTypeSelectOption__IconWrapper">
                <Icon icon={data.icon}/>
            </div>
            <div className="AlertTypeSelectOption__Label">
                {data.label}
            </div>
        </components.Option>
    );
}

function AlertRuleTypeSelect({value, onChange}) {
    return (
        <div className="AlertRuleBuilderInput--AlertType AlertRuleBuilderInput">
            <div className="AlertRuleBuilderInput__Label">
                Alert Type
            </div>
            <Select value={value} options={alertTypeOptions} components={{
                Option: AlertTypeSelectOption,
            }} onChange={onChange}/>
        </div>
    );
}

AlertRuleTypeSelect.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
};

export default AlertRuleTypeSelect;
