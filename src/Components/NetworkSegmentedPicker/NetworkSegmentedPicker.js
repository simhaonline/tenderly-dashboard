import React from 'react';

import {NetworkLabelMap, NetworkTypes} from "../../Common/constants";

import {SegmentedControls} from '../../Elements';

const NetworkSegmentedOptions = Object.values(NetworkTypes).map(networkType => {
    return {
        value: networkType,
        label: NetworkLabelMap[networkType],
    }
});

const NetworkSegmentedPicker = ({value, onChange}) => (
    <SegmentedControls options={NetworkSegmentedOptions} value={value} onChange={onChange}/>
);

export default NetworkSegmentedPicker;
