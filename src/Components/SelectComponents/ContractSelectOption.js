import React from 'react';
import PropTypes from 'prop-types';
import Blockies from "react-blockies";
import {components} from 'react-select';

import {generateShortAddress} from "../../Utils/AddressFormatter";

import {NetworkTag} from "..";

import './ContractSelectOption.scss';

function ContractSelectOption(props) {
    /** @type {Contract} */
    const data = props.data;

    return (
        <components.Option {...props} className="ContractSelectOption">
            <Blockies size={8} scale={5} className="ContractSelectOption__Blockie" seed={data.getUniqueId()}/>
            <div className="MarginLeft2">
                <div className="SemiBoldText MarginBottom1">{data.name}</div>
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
