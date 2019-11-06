import React, {Fragment} from 'react';
import Blockies from "react-blockies";

import {Contract} from "../../Core/models";

import {generateShortAddress} from "../../Utils/AddressFormatter";
import {getRouteSlugForNetwork} from "../../Utils/RouterHelpers";

import {Card, Tag, Icon, Tooltip} from "../../Elements";
import {PageLink, NetworkTag} from "../index";

import './PublicContractThumbnail.scss';

const PublicContractThumbnail = ({contract, displayWatchCount}) => {
    const networkId = getRouteSlugForNetwork(contract.network);

    return (
        <PageLink to={`/contract/${networkId}/${contract.address.toLowerCase()}`} className="PublicContractThumbnail">
            <Card className="PublicContractThumbnail__Card" clickable>
                <div className="DisplayFlex AlignItemsCenter MarginBottom2">
                    <Blockies
                        seed={Contract.generateUniqueContractId(contract.address, contract.network)}
                        size={8}
                        scale={5}
                        className="PublicContractThumbnail__Blockie"
                    />
                    <div className="PublicContractThumbnail__Info">
                        <h5 className="PublicContractThumbnail__Name">{contract.name}</h5>
                        <div className="PublicContractThumbnail__Address">
                            {generateShortAddress(contract.address, 9, 6)}
                        </div>
                    </div>
                </div>
                <div>
                    <NetworkTag network={contract.network} size="small"/>
                    {displayWatchCount && <Fragment>
                        <Tag size="small" className="MarginLeft1" color="secondary-outline" id={`PublicContract_${contract.address}`}>
                            <Icon icon="star"/>
                            <span>{contract.watchCount}</span>
                        </Tag>
                        <Tooltip id={`PublicContract_${contract.address}`}>
                            How many people are watching this public contract
                        </Tooltip>
                    </Fragment>}
                </div>
            </Card>
        </PageLink>
    )
};

export default PublicContractThumbnail;
