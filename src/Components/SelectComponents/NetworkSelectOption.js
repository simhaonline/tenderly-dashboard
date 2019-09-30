import React from 'react';
import {components} from 'react-select';
import classNames from "classnames";

import {Icon} from "../../Elements";

import './NetworkSelectOption.scss';

function NetworkSelectOption(props) {
    /** @type {Network} */
    const data = props.data;

    return (
        <components.Option {...props} className="NetworkSelectOption">
            <div className={classNames(
                "NetworkSelectOption__IconWrapper",
                `NetworkSelectOption__IconWrapper--${data.id}`,
            )}>
                <Icon icon="layers"/>
            </div>
            <div className="NetworkSelectOption__Info">
                <div className="NetworkSelectOption__Label">{data.name}</div>
                <div className="NetworkSelectOption__Description">
                    All contracts deployed on {data.name}
                </div>
            </div>
        </components.Option>
    );
}

export default NetworkSelectOption;
