import React from 'react';

import './ContractInformation.css';

const ContractInformation = ({contract}) => {
    return (
        <div className="ContractInformation">
            <div>{contract.name}</div>
            <div>{contract.network}</div>
            <div>{contract.address}</div>
            <div>{contract.solidity}</div>
        </div>
    )
};

export default ContractInformation;
