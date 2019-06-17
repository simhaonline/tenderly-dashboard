import React from 'react';

import './Sidebar.scss';

const Sidebar = ({children, ...props}) => {
    return (
        <div className="Sidebar" {...props}>
            <div className="SidebarContent">
                {children}
            </div>
        </div>
    );
};

export default Sidebar;
