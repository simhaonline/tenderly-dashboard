import React from 'react';
import PropTypes from 'prop-types';
import {components} from 'react-select';

import {Tag} from "../../Elements";

function ContractInputSelectOption(props) {
    /** @type {ContractInputParameter} */
    const data = props.data;

    return (
        <components.Option {...props}>
            <Tag size="small" color="primary-outline" className="MonospaceFont">{data.type}</Tag>
            <span className="MonospaceFont MarginLeft1">{data.name}</span>
        </components.Option>
    );
}

ContractInputSelectOption.propTypes = {
    unique: PropTypes.bool,
};

export default ContractInputSelectOption;
