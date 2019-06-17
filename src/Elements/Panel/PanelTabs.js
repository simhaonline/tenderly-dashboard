import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PanelTabs = ({className, children}) => {
    return (
        <div className={classNames(
            "PanelTabs",
            className
        )}>
            {children}
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
