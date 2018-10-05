import React from 'react';
import {Link} from "react-router-dom";

import './PublicContractList.css';

const PublicContractListItem = ({contract}) => {
    return (
        <Link className="PublicContractListItem" to={`/contract/${contract.id}`}>
            <div className="NameColumn">
                {contract.name}
            </div>
            <div className="AddressColumn" title={contract.address}>
                {contract.address}
            </div>
        </Link>
    )
};

const PublicContractList = ({contracts}) => {
    return (
        <div className="PublicContractList">
            <div className="ListHeader">
                <div className="NameColumn">Contract</div>
                <div className="AddressColumn">Address</div>
            </div>
            {contracts.map(contract => <PublicContractListItem key={contract.id} contract={contract}/>)}
        </div>
    )
};

export default PublicContractList;
