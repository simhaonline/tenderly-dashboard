import React from 'react';
import classNames from 'classnames';

export const PanelDivider = () => (
    <div className="PanelDivider"/>
);

const PanelContent = ({className, children}) => {
    return (
        <div className={classNames(
            "PanelContent",
            className
        )}>
            {children}
        </div>
    )
};

export default PanelContent;
