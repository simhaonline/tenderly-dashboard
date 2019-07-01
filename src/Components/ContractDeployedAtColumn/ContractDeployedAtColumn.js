import React from 'react';
import PropTypes from 'prop-types';

import {Contract} from "../../Core/models";

const ContractDeployedAtColumn = ({contract}) => {
    return (
        <div className="ContractDeployedAtColumn">
            <span>{contract.createdAt.format('DD-MM-YYYY HH:mm')}</span>
            <span className="MutedText"> ({contract.createdAt.fromNow()})</span>
        </div>
    )
};

ContractDeployedAtColumn.propTypes = {
    contract: PropTypes.instanceOf(Contract),
};

export default ContractDeployedAtColumn;
