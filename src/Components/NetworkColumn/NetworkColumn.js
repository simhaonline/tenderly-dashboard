import React from 'react';
import {NetworkTag} from "../index";

const NetworkColumn = ({network}) => {
    return (
        <NetworkTag network={network} size="small"/>
    )
};

export default NetworkColumn;
