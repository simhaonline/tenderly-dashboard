import React from 'react';
import PropTypes from 'prop-types';

import {Contract} from "../../Core/models";

const ContractNameColumn = ({contract}) => {
    return (
        <div className="ContractNameColumn">
            <span className="SemiBoldText">{contract.name}</span>
        </div>
    )
};

ContractNameColumn.propTypes = {
    address: PropTypes.instanceOf(Contract),
};

export default ContractNameColumn;
