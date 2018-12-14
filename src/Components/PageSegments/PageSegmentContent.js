import React from 'react';

import './PageSegmentContent.css';

const PageSegmentContent = ({children}) => {
    return (
        <div className="PageSegmentContent">
            {children}
        </div>
    )
};

export default PageSegmentContent;
