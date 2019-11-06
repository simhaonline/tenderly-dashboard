import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {getLabelForNetwork, getShorthandForNetwork} from "../../Utils/NetworkHelpers";

import {NetworkTypes} from "../../Common/constants";

import './NetworkTag.scss';

const networkTypeToClassNameMap = {
    [NetworkTypes.MAIN]: 'NetworkTag--main',
    [NetworkTypes.KOVAN]: 'NetworkTag--kovan',
    [NetworkTypes.ROPSTEN]: 'NetworkTag--ropsten',
    [NetworkTypes.RINKEBY]: 'NetworkTag--rinkeby',
    [NetworkTypes.GOERLI]: 'NetworkTag--goerli',
};

const networkTagSizeToClassNameMap = {
    small: 'NetworkTag--Small',
};

const NetworkTag = ({size, network, prefix, className, id, useShorthand}) => {
    let networkLabel = getLabelForNetwork(network);
    const networkClassName = networkTypeToClassNameMap[network];
    const sizeClassName = networkTagSizeToClassNameMap[size];

    if (useShorthand) {
        networkLabel = getShorthandForNetwork(network);
    }

    if (prefix) {
        networkLabel = `${prefix} ${networkLabel}`;
    }

    return (
        <span className={classNames(
            "NetworkTag",
            networkClassName,
            sizeClassName,
            {
                "NetworkTag--Shorthand": useShorthand,
            },
            className,
        )} id={id}>
            {networkLabel}
        </span>
    )
};

NetworkTag.propTypes = {
    network: PropTypes.string.isRequired,
    size: PropTypes.string,
    prefix: PropTypes.string,
    className: PropTypes.string,
    useShorthand: PropTypes.bool,
};

export default NetworkTag;
