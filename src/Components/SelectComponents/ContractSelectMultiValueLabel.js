import React from 'react';
import PropTypes from 'prop-types';
import {components} from "react-select";

import {NetworkTag} from "..";

import './ContractSelectMultiValueLabel.scss';

function ContractSelectMultiValueLabel(props) {
    const {data} = props;

    return (
        <components.MultiValueLabel {...props}>
            <div className="ContractSelectMultiValueLabel">
                <NetworkTag network={data.network} useShorthand size="small" className="ContractSelectMultiValueLabel__Network"/>
                <div className="ContractSelectMultiValueLabel__Name">
                    {data.label}
                </div>
            </div>
        </components.MultiValueLabel>
    );
}

ContractSelectMultiValueLabel.propTypes = {
    unique: PropTypes.bool,
};

export default ContractSelectMultiValueLabel;
