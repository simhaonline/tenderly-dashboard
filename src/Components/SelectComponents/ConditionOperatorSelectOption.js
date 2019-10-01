import React from 'react';
import PropTypes from 'prop-types';
import {components} from 'react-select';

import {Tag} from "../../Elements";

function ConditionOperatorSelectOption(props) {
    /** @type {AlertParameterConditionOperatorOption} */
    const data = props.data;

    return (
        <components.Option {...props}>
            <Tag size="small" className="MonospaceFont">{data.value}</Tag>
            <span className="MonospaceFont MarginLeft1">{data.label}</span>
        </components.Option>
    );
}

ConditionOperatorSelectOption.propTypes = {
    unique: PropTypes.bool,
};

export default ConditionOperatorSelectOption;
