import React from 'react';

import './Container.css';

const Container = ({children, ...props}) => (
    <div className="Container" {...props}>
        {children}
    </div>
);

export default Container;
