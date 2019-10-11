import React from 'react';
import PropTypes from 'prop-types';

import {EtherscanLinkTypes, NetworkTypes} from "../../Common/constants";

const NetworkToPrefixMap = {
    [NetworkTypes.KOVAN]: 'kovan.',
    [NetworkTypes.RINKEBY]: 'rinkeby.',
    [NetworkTypes.ROPSTEN]: 'ropsten.',
    [NetworkTypes.GOERLI]: 'goerli.',
};

const TypeToUrlPathMap = {
    [EtherscanLinkTypes.BLOCK]: 'block',
    [EtherscanLinkTypes.TRANSACTION]: 'tx',
    [EtherscanLinkTypes.ADDRESS]: 'address',
};

const EtherscanLink = ({network, type, value, path = '', children, ...props}) => {
    const etherscanPrefix = NetworkToPrefixMap[network] || '';

    if (!!path) {
        return (
            <a target="_blank" rel="noopener noreferrer" href={`https://${etherscanPrefix}etherscan.io/${path}`} {...props}>
                {children}
            </a>
        );
    }

    const etherscanUrlPath = TypeToUrlPathMap[type];

    return (
        <a target="_blank" rel="noopener noreferrer" href={`https://${etherscanPrefix}etherscan.io/${etherscanUrlPath}/${value}`} {...props}>
            {children}
        </a>
    );
};

EtherscanLink.propTypes = {
    network: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    path: PropTypes.string,
};

export default EtherscanLink;
