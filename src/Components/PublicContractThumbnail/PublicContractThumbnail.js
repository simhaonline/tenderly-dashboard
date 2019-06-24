import React from 'react';
import Blockies from "react-blockies";

import {generateShortAddress} from "../../Utils/AddressFormatter";
import {NetworkAppToRouteTypeMap} from "../../Common/constants";

import {Card} from "../../Elements";
import PageLink from "../PageLink/PageLink";

import './PublicContractThumbnail.scss';

const PublicContractThumbnail = ({contract}) => {
    const networkId = NetworkAppToRouteTypeMap[contract.network];
    return (
        <PageLink to={`/contract/${networkId}/${contract.address.toLowerCase()}`} className="PublicContractThumbnail">
            <Card className="PublicContractThumbnail__Card" clickable>
                <Blockies
                    seed={contract.address}
                    size={8}
                    scale={5}
                    className="PublicContractThumbnail__Blockie"
                />
                <div className="PublicContractThumbnail__Info">
                    <h5 className="PublicContractThumbnail__Name">{contract.name}</h5>
                    <div className="PublicContractThumbnail__Address">
                        {generateShortAddress(contract.address, 10, 6)}
                    </div>
                </div>
            </Card>
        </PageLink>
    )
};

export default PublicContractThumbnail;
