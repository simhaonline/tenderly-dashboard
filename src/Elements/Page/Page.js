import React from 'react';

const Page = ({children, ...props}) => {
    return (
        <div className="Page" {...props}>
            {children}
        </div>
    );
};

export default Page;
