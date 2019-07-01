import React from 'react';
import PropTypes from 'prop-types';

import {generateShortAddress} from "../../Utils/AddressFormatter";

import {Tooltip} from "../../Elements";

import './ContractAddressColumn.scss';

const ContractAddressColumn = ({address}) => {
    return (
        <div className="ContractAddressColumn">
            <span id={`ContractAddressColumn--${address}`}>
                {generateShortAddress(address, 12, 4)}
            </span>
            <Tooltip id={`ContractAddressColumn--${address}`}>{address}</Tooltip>
        </div>
    )
};

ContractAddressColumn.propTypes = {
    address: PropTypes.string.isRequired,
};

export default ContractAddressColumn;
