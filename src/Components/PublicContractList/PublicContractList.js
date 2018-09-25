import React from 'react';
import {Link} from "react-router-dom";

import './PublicContractList.css';

const PublicContractListItem = ({contract}) => {
    return (
        <Link className="PublicContractListItem" to={`/contract/${contract.id}`}>
            {contract.name}
        </Link>
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
