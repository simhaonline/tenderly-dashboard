import React from 'react';
import {withRouter} from "react-router-dom";

const PageLink = ({history, onClick, to, children, staticContext, ...props}) => {
    const handleClick = (event) => {
        onClick(event);
        history.push(to);
    };


    return (
        <div onClick={handleClick} {...props}>
            {children}
        </div>
    );
};

PageLink.defaultProps = {
    onClick: () => {},
};

export default withRouter(PageLink);
