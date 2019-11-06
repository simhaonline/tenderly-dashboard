import React from 'react';
import PropTypes from 'prop-types';
import {components} from "react-select";

import {getLabelForNetwork} from "../../Utils/NetworkHelpers";

import {Tooltip} from "../../Elements";
import {NetworkTag} from "..";

import './ContractSelectMultiValueLabel.scss';

function ContractSelectMultiValueLabel(props) {
    const {data} = props;

    return (
        <components.MultiValueLabel {...props}>
            <div className="ContractSelectMultiValueLabel" >
                <NetworkTag network={data.network} id={data.getUniqueId().replace(':', '_')} useShorthand size="small" className="ContractSelectMultiValueLabel__Network"/>
                <div className="ContractSelectMultiValueLabel__Name">
                    {data.name}
                </div>
                <Tooltip id={data.getUniqueId().replace(':', '_')} placement="top">
                    {getLabelForNetwork(data.network)}
                </Tooltip>
            </div>
        </components.MultiValueLabel>
    );
}

ContractSelectMultiValueLabel.propTypes = {
    unique: PropTypes.bool,
};

export default ContractSelectMultiValueLabel;
