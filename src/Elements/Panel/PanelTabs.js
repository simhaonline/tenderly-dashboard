import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PanelTabs = ({tabs, active, onChange, className, tabClassName}) => {
    return (
        <div className={classNames(
            "PanelTabs",
            className
        )}>
            {tabs.map(tab => <div className={classNames(
                "PanelTab",
                tabClassName,
                {
                    "Active": tab.value === active,
                }
            )} key={tab.value} onClick={event => onChange(tab.value, event)}>
                {tab.label}
            </div>)}
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
