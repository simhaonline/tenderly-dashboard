import React from 'react';

import {EtherscanLinkTypes, NetworkTypes} from "../../Common/constants";

const NetworkToPrefixMap = {
    [NetworkTypes.KOVAN]: 'kovan.',
};

const TypeToUrlPathMap = {
    [EtherscanLinkTypes.BLOCK]: 'block',
    [EtherscanLinkTypes.TRANSACTION]: 'tx',
};

const EtherscanLink = ({network, type, value, path = '', children, ...props}) => {
    const etherscanPrefix = NetworkToPrefixMap[network] || '';

    if (!!path) {
        return (
            <a target="_blank" href={`https://${etherscanPrefix}etherscan.io/${path}`} {...props}>
                {children}
            </a>
        );
    }

    const etherscanUrlPath = TypeToUrlPathMap[type];

    return (
        <a target="_blank" href={`https://${etherscanPrefix}etherscan.io/${etherscanUrlPath}/${value}`} {...props}>
            {children}
        </a>
    );
};

export default EtherscanLink;
