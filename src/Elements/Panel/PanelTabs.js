import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {FeatureFlag} from "../../Components";

const PanelTabs = ({tabs, active, onChange, className, tabClassName}) => {
    return (
        <div className={classNames(
            "PanelTabs",
            className
        )}>
            {tabs.map(tab => tab.featureFlag ?
                <FeatureFlag flag={tab.featureFlag} key={tab.value}>
                    <div className={classNames(
                        "PanelTab",
                        tabClassName,
                        {
                            "Active": tab.value === active,
                        }
                    )} onClick={event => onChange(tab.value, event)}>
                        {tab.label}
                    </div>
                </FeatureFlag> :
                <div className={classNames(
                    "PanelTab",
                    tabClassName,
                    {
                        "Active": tab.value === active,
                    }
                )} key={tab.value} onClick={event => onChange(tab.value, event)}>
                    {tab.label}
                </div>
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
