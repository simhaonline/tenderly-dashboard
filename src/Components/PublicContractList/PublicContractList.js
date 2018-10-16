import React from 'react';
import {Link} from "react-router-dom";

import './PublicContractList.css';
import {NetworkAppToApiTypeMap} from "../../Common/constants";

const PublicContractListItem = ({contract}) => {
    const networkType = NetworkAppToApiTypeMap[contract.network];

    return (
        <Link className="PublicContractListItem" to={`/contract/${networkType}/${contract.id}`}>
            <div className="MainInfo">
                <h4 className="ContractName">{contract.name}</h4>
            </div>
            <div className="AddressInfo" title={contract.address}>
                <div className="InfoLabel">Address</div>
                <div className="Address">{contract.address}</div>
            </div>
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
