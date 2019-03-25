import React from 'react';
import classNames from 'classnames';

import {NetworkLabelMap, NetworkTypes} from "../../Common/constants";

import './NetworkTag.css';

const networkTypeToClassNameMap = {
    [NetworkTypes.MAIN]: 'main',
    [NetworkTypes.KOVAN]: 'kovan',
    [NetworkTypes.ROPSTEN]: 'ropsten',
    [NetworkTypes.RINKEBY]: 'rinkeby',
};

const networkTagSizeToClassNameMap = {
    small: 'Small',
};

const NetworkTag = ({size, network, prefix, className}) => {
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

export default NetworkTag;
