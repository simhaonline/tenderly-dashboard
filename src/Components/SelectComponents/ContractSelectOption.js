import React from 'react';
import PropTypes from 'prop-types';
import Blockies from "react-blockies";
import {components} from 'react-select';

import {NetworkTag} from "..";

import './ContractSelectOption.scss';
import {generateShortAddress} from "../../Utils/AddressFormatter";

function ContractSelectOption(props) {
    const data = props.data;

    return (
        <components.Option {...props} className="ContractSelectOption">
            <div>
                <Blockies className="ContractSelectOption__Blockie" seed={data.value}/>
            </div>
            <div className="MarginLeft2">
                <div className="SemiBoldText MarginBottom1">{data.label}</div>
                <div>
                    <NetworkTag size="small" network={data.network}/>
                    <span className="MonospaceFont LinkText MarginLeft1">{generateShortAddress(data.address, 12, 6)}</span>
                </div>
            </div>
        </components.Option>
    );
}

ContractSelectOption.propTypes = {
    unique: PropTypes.bool,
};

export default ContractSelectOption;
