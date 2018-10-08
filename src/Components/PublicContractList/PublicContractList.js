import React from 'react';
import {Link} from "react-router-dom";

import './PublicContractList.css';
import {NetworkAppToApiTypeMap} from "../../Common/constants";

const PublicContractListItem = ({contract}) => {
    const networkType = NetworkAppToApiTypeMap[contract.network];

    return (
        <Link className="PublicContractListItem" to={`/contract/${networkType}/${contract.id}`}>
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
