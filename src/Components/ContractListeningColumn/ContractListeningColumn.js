import React from 'react';
import PropTypes from 'prop-types';

import {Contract} from "../../Core/models";


const ContractListeningColumn = ({contract, onToggle}) => {
    console.log(contract);
    return (
        <div className="ContractListeningColumn">
            <div onClick={event => {event.stopPropagation(); onToggle(contract, event)}}>
                {contract.name}
            </div>
        </div>
    )
};

ContractListeningColumn.propTypes = {
    contract: PropTypes.instanceOf(Contract).isRequired,
    onToggle: PropTypes.func.isRequired,
};

export default ContractListeningColumn;
