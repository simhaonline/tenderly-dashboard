import React, {Component} from 'react';
import Blockies from 'react-blockies';

import {EtherscanLinkTypes, NetworkAppToRouteTypeMap, NetworkTypes} from "../../Common/constants";
import {generateShortAddress} from "../../Utils/AddressFormatter";

import {Card} from "../../Elements";
import EtherscanLink from "../EtherscanLink/EtherscanLink";

import './PopularContractsImport.css';
import PageLink from "../PageLink/PageLink";

const PopularContractSlugs = {
    MAKER_DAU: 'maker_dao',
    CRYPTO_KITTIES: 'crypto_kitties',
};

const PopularContracts = {
    [PopularContractSlugs.MAKER_DAU]: {
        slug: PopularContractSlugs.MAKER_DAU,
        address: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
        name: 'Maker DAO',
        network: NetworkTypes.MAIN,
    },
    [PopularContractSlugs.CRYPTO_KITTIES]: {
        slug: PopularContractSlugs.CRYPTO_KITTIES,
        address: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
        name: 'Crypto Kitties',
        network: NetworkTypes.MAIN,
    },
};

const PopularContract = ({slug}) => {
    const contract = PopularContracts[slug];

    if (!contract) {
        return null;
    }

    const networkId = NetworkAppToRouteTypeMap[contract.network];

    return (
        <PageLink to={`/contract/${networkId}/${contract.address.toLowerCase()}`} className="PopularContractWrapper">
            <Card className="PopularContract" clickable>
                <Blockies
                    seed={contract.address}
                    size={8}
                    scale={5}
                    className="ContractBlockie"
                />
                <div className="ContractInfo">
                    <h5 className="ContractName">{contract.name}</h5>
                    <div className="ContractAddress">
                        <EtherscanLink onClick={event => event.stopPropagation()} network={contract.network} type={EtherscanLinkTypes.ADDRESS} value={contract.address}>
                            {generateShortAddress(contract.address, 10, 6)}
                        </EtherscanLink>
                    </div>
                </div>
            </Card>
        </PageLink>
    )
};

class PopularContractsImport extends Component {
    render() {
        return (
            <div className="PopularContractsImport">
                <h2 className="SectionHeading">Popular Contracts</h2>
                <p className="SectionDescription">You can also monitor some of the popular contracts that are verified publicly.</p>
                <div className="ContractsWrapper">
                    {Object.values(PopularContractSlugs).map(slug =>
                        <PopularContract key={slug}
                                         slug={slug}/>
                    )}
                </div>
            </div>
        );
    }
}

export default PopularContractsImport;
