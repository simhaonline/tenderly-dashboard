import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {FeatureFlag} from "../../Components";

import {Tag} from "../";

const PanelTab = ({tab, active, onChange, className}) => {
    return (
        <div className={classNames(
            "PanelTab",
            className,
            {
                "Active": tab.value === active,
            }
        )} onClick={event => onChange(tab.value, event)}>
            {tab.label}
            {!!tab.tagLabel && <Tag size="small" color={tab.tagColor} className="MarginLeft1">
                {tab.tagLabel}
            </Tag>}
        </div>
    );
};

const PanelTabs = ({tabs, active, onChange, className, tabClassName}) => {
    return (
        <div className={classNames(
            "PanelTabs",
            className
        )}>
            {tabs.map(tab => tab.featureFlag ?
                <FeatureFlag flag={tab.featureFlag} key={tab.value}>
                    <PanelTab tab={tab} onChange={onChange} className={tabClassName} active={active}/>
                </FeatureFlag> :
                <PanelTab key={tab.value} tab={tab} onChange={onChange} className={tabClassName} active={active}/>
            )}
        </div>
    )
};

PanelTabs.propTypes = {
    tabs: PropTypes.array.isRequired,
    active: PropTypes.string,
    onChange: PropTypes.func,
};

PanelTabs.defaultProps = {
    onChange: () => {},
};

export default PanelTabs;
