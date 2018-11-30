import React from 'react';
import classNames from 'classnames';

import {NetworkTypes} from "../../Common/constants";

import './NetworkTag.css';

const networkTypeToLabelMap = {
    [NetworkTypes.MAIN]: 'Main Network',
    [NetworkTypes.KOVAN]: 'Kovan Testnet',
};

const networkTypeToClassNameMap = {
    [NetworkTypes.MAIN]: 'main',
    [NetworkTypes.KOVAN]: 'kovan',
};

const networkTagSizeToClassNameMap = {
    small: 'Small',
};

const NetworkTag = ({size, network, prefix}) => {
    let networkLabel = networkTypeToLabelMap[network];
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
        )}>
            {networkLabel}
        </span>
    )
};

export default NetworkTag;
