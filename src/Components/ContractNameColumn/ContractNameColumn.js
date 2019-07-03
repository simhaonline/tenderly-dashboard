import React from 'react';
import PropTypes from 'prop-types';

import {generateShortAddress} from "../../Utils/AddressFormatter";
import {Contract} from "../../Core/models";

const ContractNameColumn = ({contract}) => {
    return (
        <div className="ContractNameColumn">
            <span className="SemiBoldText">{contract.name}</span>
            <div className="DisplayMobile LinkText MonospaceFont">{generateShortAddress(contract.address, 12, 4)}</div>
        </div>
    )
};

ContractNameColumn.propTypes = {
    address: PropTypes.instanceOf(Contract),
};

export default ContractNameColumn;
