import React from 'react';
import {components} from "react-select";
import PropTypes from 'prop-types';

import {Icon, Select} from "../../Elements";

const alertTypeOptions = [
    {
        label: 'Successful Transaction',
        value: 'successful_tx',
        icon: 'check-circle',
    },
    {
        label: 'Failed Transaction',
        value: 'failed_tx',
        icon: 'x-circle',
    },
    {
        label: 'Function Call',
        value: 'method_call',
        icon: 'layers',
    },
    {
        label: 'Event Emitted',
        value: 'log_emitted',
        icon: 'bookmark',
    },
    {
        label: 'Function Argument',
        value: 'method_argument',
        icon: 'code',
    },
    {
        label: 'Event Argument',
        value: 'log_argument',
        icon: 'code',
    },
    {
        label: 'Whitelisted Caller',
        value: 'whitelisted_caller',
        icon: 'eye',
    },
    {
        label: 'Blacklisted Caller',
        value: 'blacklisted_caller',
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
