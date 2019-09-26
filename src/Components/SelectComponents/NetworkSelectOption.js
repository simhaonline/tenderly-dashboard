import React from 'react';
import {components} from 'react-select';
import classNames from "classnames";

import {NetworkLabelMap} from "../../Common/constants";

import {Icon} from "../../Elements";

import './NetworkSelectOption.scss';

function NetworkSelectOption(props) {
    const {data} = props;

    return (
        <components.Option {...props} className="NetworkSelectOption">
            <div className={classNames(
                "NetworkSelectOption__IconWrapper",
                `NetworkSelectOption__IconWrapper--${data.value}`,
            )}>
                <Icon icon="layers"/>
            </div>
            <div className="NetworkSelectOption__Info">
                <div className="NetworkSelectOption__Label">{data.label}</div>
                <div className="NetworkSelectOption__Description">
                    All contracts deployed on {NetworkLabelMap[data.value]}
                </div>
            </div>
        </components.Option>
    );
}

export default NetworkSelectOption;
