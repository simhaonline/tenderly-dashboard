import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {NetworkLabelMap, NetworkTypes} from "../../Common/constants";

import './NetworkTag.scss';

const networkTypeToClassNameMap = {
    [NetworkTypes.MAIN]: 'NetworkTag--main',
    [NetworkTypes.KOVAN]: 'NetworkTag--kovan',
    [NetworkTypes.ROPSTEN]: 'NetworkTag--ropsten',
    [NetworkTypes.RINKEBY]: 'NetworkTag--rinkeby',
};

const networkTagSizeToClassNameMap = {
    small: 'NetworkTag--Small',
};

const NetworkTag = ({size, network, prefix, className, short}) => {
    let networkLabel = NetworkLabelMap[network];
    const networkClassName = networkTypeToClassNameMap[network];
    const sizeClassName = networkTagSizeToClassNameMap[size];

    if (prefix) {
        networkLabel = `${prefix} ${networkLabel}`;
    }

    return (
        <span className={classNames(
            "NetworkTag",
            networkClassName,
            sizeClassName,
            className,
        )}>
            {networkLabel}
        </span>
    )
};

NetworkTag.propTypes = {
    network: PropTypes.string.isRequired,
    size: PropTypes.string,
    prefix: PropTypes.string,
    className: PropTypes.string,
};

export default NetworkTag;
