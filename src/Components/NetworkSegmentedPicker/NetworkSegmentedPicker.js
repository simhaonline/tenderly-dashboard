import React from 'react';

import {NetworkLabelMap, NetworkTypes} from "../../Common/constants";

import {SegmentedControls} from '../../Elements';

const NetworkSegmentedOptions = Object.values(NetworkTypes).map(networkType => {
    return {
        value: networkType,
        label: NetworkLabelMap[networkType],
    }
});

const NetworkSegmentedPicker = ({...props}) => (
    <SegmentedControls options={NetworkSegmentedOptions} {...props}/>
);

export default NetworkSegmentedPicker;
