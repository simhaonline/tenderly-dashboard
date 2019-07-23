import React from 'react';
import classNames from "classnames";

import {Icon, Card} from "../../Elements";
import FeatureFlag from "../FeatureFlag/FeatureFlag";

import './PageSegmentSwitcher.scss';

const PageSegmentSwitcherOption = ({option, onSelect, active}) => {
    return (
        <div className="SwitchOption">
            <Card className={classNames(
                "SwitchOption__Card",
                {
                    "SwitchOption__Card--Active": active,
                },
            )} onClick={() => {onSelect(option.value)}}>
                <div className="SwitchInfo">
                    <div className="SwitchLabel">{option.label}</div>
                    {!!option.description && <div className="SwitchDescription">{option.description}</div>}
                </div>
                <div className="SwitchIconWrapper">
                    <Icon icon="chevron-right" className="SwitchIcon"/>
                </div>
            </Card>
        </div>
    );
};

const PageSegmentSwitcher = ({options, onSelect, current}) => {
    return (
        <div className="PageSegmentSwitcher">
            {options.map(option => option.featureFlag ? <FeatureFlag flag={option.featureFlag} key={option.value}>
                <PageSegmentSwitcherOption option={option} onSelect={onSelect} active={option.value === current}/>
            </FeatureFlag> : <PageSegmentSwitcherOption option={option} onSelect={onSelect} active={option.value === current} key={option.value}/>)}
        </div>
    )
};

PageSegmentSwitcher.defaultProps = {
    onSelect: () => {},
};

export default PageSegmentSwitcher;
