import React from 'react';
import PropTypes from 'prop-types';
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

const NetworkTag = ({size, network, prefix, className, short}) => {
    let networkLabel = NetworkLabelMap[network];
    const networkClassName = networkTypeToClassNameMap[network];
    const sizeClassName = networkTagSizeToClassNameMap[size];

    if (short) {
        networkLabel = networkLabel.split(' ')[0];
    }

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
    short: PropTypes.bool,
};

NetworkTag.defaultProps = {
    short: false,
};

export default NetworkTag;
