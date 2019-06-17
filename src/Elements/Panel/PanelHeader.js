import React from 'react';
import classNames from 'classnames';

const PanelHeader = ({className, children}) => {
    return (
        <div className={classNames(
            "PanelHeader",
            className
        )}>
            {children}
        </div>
    )
};

export default PanelHeader;
