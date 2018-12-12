import React from 'react';
import {Link} from "react-router-dom";

import {EtherscanLinkTypes, NetworkAppToApiTypeMap} from "../../Common/constants";

import {Card} from "../../Elements";

import EtherscanLink from "../EtherscanLink/EtherscanLink";
import NetworkTag from "../NetworkTag/NetworkTag";

import './ContractInformation.css';

const ContractInformation = ({contract}) => {
    const networkType = NetworkAppToApiTypeMap[contract.network];

    return (
        <div className="ContractInformation">
            <div className="ContractName">
                <h2><Link to={`/contract/${networkType}/${contract.id}`}>{contract.name}</Link></h2>
                <div><NetworkTag network={contract.network}/></div>
            </div>
            <Card className="ContractDetails">
                <div className="DetailsWrapper">
                    <div className="DetailLabel">Address:</div>
                    <div className="DetailValue">
                        <EtherscanLink network={contract.network} type={EtherscanLinkTypes.ADDRESS} value={contract.address}>{contract.address}</EtherscanLink>
                    </div>
                </div>
                <div className="DetailsWrapper">
                    <div className="DetailLabel">Solidity Verson:</div>
                    <div className="DetailValue">{contract.solidity}</div>
                </div>
            </Card>
        </div>
    )
};

export default ContractInformation;
