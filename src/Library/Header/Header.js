import React from 'react';

const Header = ({children, ...props}) => {
    return (
        <div className="Header" {...props}>
            {children}
        </div>
    );
};

export default Header;
