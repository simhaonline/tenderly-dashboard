import React from 'react';

import './ContractInformation.css';

const ContractInformation = ({contract}) => {
    console.log(contract);
    return (
        <div className="ContractInformation">
            {contract.name}
        </div>
    )
};

export default ContractInformation;
