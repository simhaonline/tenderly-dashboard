import React from 'react';
import {withRouter} from "react-router-dom";

const PageLink = ({history, to, children, staticContext, ...props}) => {
    return (
        <div onClick={() => { history.push(to) }} {...props}>
            {children}
        </div>
    );
};

export default withRouter(PageLink);
