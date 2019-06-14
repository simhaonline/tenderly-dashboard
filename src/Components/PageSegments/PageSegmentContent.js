import React from 'react';

import './PageSegmentContent.scss';

const PageSegmentContent = ({children}) => {
    return (
        <div className="PageSegmentContent">
            {children}
        </div>
    )
};

export default PageSegmentContent;
