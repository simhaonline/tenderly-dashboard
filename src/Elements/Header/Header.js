import React from 'react';

import './Header.scss';

const Header = ({children, ...props}) => {
    return (
        <div className="Header" {...props}>
            {children}
        </div>
    );
};

export default Header;
