import React from 'react';

import './PageSegments.scss';

const PageSegments = ({children}) => {
    return (
        <div className="PageSegments">
            {children}
        </div>
    )
};

export default PageSegments;
