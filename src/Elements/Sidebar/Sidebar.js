import React from 'react';

const Sidebar = ({children, ...props}) => {
    return (
        <div className="Sidebar" {...props}>
            {children}
        </div>
    );
};

export default Sidebar;
