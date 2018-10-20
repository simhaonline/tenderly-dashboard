import React from 'react';

import EtherscanLink from "../EtherscanLink/EtherscanLink";
import NetworkTag from "../NetworkTag/NetworkTag";

import './PublicContractsInfo.css';

const PublicContractsInfo = ({network}) => {
    return (
        <div className="PublicContractsInfo">
            <h2>Public Contracts <NetworkTag network={network}/></h2>
            <p>We track all contract errors with a full stack trace that happen on public <EtherscanLink network={network} path={"contractsVerified"}>verified contracts</EtherscanLink>.</p>
        </div>
    )
};

export default PublicContractsInfo;
