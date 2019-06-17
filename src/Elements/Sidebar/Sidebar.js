import React from 'react';

import './Sidebar.scss';

const Sidebar = ({children, ...props}) => {
    return (
        <div className="Sidebar" {...props}>
            {children}
        </div>
    );
};

export default Sidebar;
