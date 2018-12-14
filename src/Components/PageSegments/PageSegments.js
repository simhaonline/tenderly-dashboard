import React from 'react';

import './PageSegments.css';

const PageSegments = ({children}) => {
    return (
        <div className="PageSegments">
            {children}
        </div>
    )
};

export default PageSegments;
