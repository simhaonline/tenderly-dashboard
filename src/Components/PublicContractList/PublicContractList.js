import React from 'react';
import {Link} from "react-router-dom";
import moment from "moment";

import './PublicContractList.css';
import {NetworkAppToApiTypeMap} from "../../Common/constants";

const PublicContractListItem = ({contract}) => {
    const networkType = NetworkAppToApiTypeMap[contract.network];

    return (
        <Link className="PublicContractListItem" to={`/contract/${networkType}/${contract.id}`}>
            <div className="MainInfo">
                <h4 className="ContractName">{contract.name}</h4>
            </div>
            <div className="EventInfo">
                {!!contract.eventCount && <div className="EventInfoItem">
                    <div className="InfoLabel">Total events:</div>
                    <div className="InfoValue">{contract.eventCount} {contract.eventCount > 1 ? 'Events' : 'Event'}</div>
                </div>}
                {!!contract.lastEventAt && <div className="EventInfoItem">
                    <div className="InfoLabel">Last event:</div>
                    <div className="InfoValue">{moment(contract.lastEventAt).format("MMM DD YYYY, HH:mm:ss")}</div>
                </div>}
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
