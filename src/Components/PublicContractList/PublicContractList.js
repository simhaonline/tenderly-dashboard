import React from 'react';
import {Link} from "react-router-dom";
import moment from "moment";

import {NetworkAppToRouteTypeMap} from "../../Common/constants";
import {Icon} from '../../Elements';

import './PublicContractList.css';

/**
 * @param {Contract} contract
 * @constructor
 */
const PublicContractListItem = ({contract}) => {
    const networkType = NetworkAppToRouteTypeMap[contract.network];

    return (
        <Link className="PublicContractListItem" to={`/contract/${networkType}/${contract.id}`}>
            <div className="VerificationColumn ItemColumn">
                {contract.isPublic && <Icon title="Verified Public Contract" icon="shield" className="VerifiedContractIcon"/>}
            </div>
            <div className="MainInfoColumn ItemColumn">
                <h4 className="ContractName">{contract.name}</h4>
            </div>
            {!!contract.lastEventAt && <div className="TimestampColumn ItemColumn">
                <div className="InfoValue">{moment(contract.lastEventAt).fromNow()}</div>
            </div>}
            {!!contract.errorCount && <div className="EventsColumn ItemColumn">
                <div className="InfoValue">{contract.errorCount} {contract.errorCount > 1 ? 'Events' : 'Event'}</div>
            </div>}
            <div className="AddressColumn ItemColumn" title={contract.address}>
                <div className="Address">{contract.address}</div>
            </div>
        </Link>
    )
};

const PublicContractList = ({contracts}) => {
    return (
        <div className="PublicContractList">
            <div className="ListHeader">
                <div className="VerificationColumn ItemColumn"/>
                <div className="MainInfoColumn ItemColumn">
                    <span className="HeaderItemTitle">Contract</span>
                </div>
                <div className="TimestampColumn ItemColumn">
                    <span className="HeaderItemTitle">Last Event</span>
                </div>
                <div className="EventsColumn ItemColumn">
                    <span className="HeaderItemTitle">Total Events</span>
                </div>
                <div className="AddressColumn ItemColumn">
                    <span className="HeaderItemTitle">Address</span>
                </div>
            </div>
            <div className="ListItems">
                {contracts.map(contract => <PublicContractListItem key={contract.id} contract={contract}/>)}
            </div>
        </div>
    )
};

export default PublicContractList;
