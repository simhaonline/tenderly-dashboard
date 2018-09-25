import React from 'react';

import './PublicContractList.css';

const PublicContractListItem = ({contract}) => {
    return (
        <div className="PublicContractListItem">
            {contract.name}
        </div>
    )
};

const PublicContractList = ({contracts}) => {
    return (
        <div className="PublicContractList">
            {contracts.map(contract => <PublicContractListItem key={contract.id} contract={contract}/>)}
        </div>
    )
};

export default PublicContractList;
