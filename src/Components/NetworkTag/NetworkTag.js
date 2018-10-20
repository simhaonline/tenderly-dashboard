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

const NetworkTag = ({size, network}) => {
    const networkLabel = networkTypeToLabelMap[network];
    const networkClassName = networkTypeToClassNameMap[network];

    return (
        <span className={classNames(
            "NetworkTag",
            networkClassName,
        )}>
            {networkLabel}
        </span>
    )
};

export default NetworkTag;
