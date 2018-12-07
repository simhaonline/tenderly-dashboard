import React from 'react';
import classNames from 'classnames';

import './Container.css';

const Container = ({children, className, ...props}) => (
    <div className={classNames(
        "Container",
        className,
    )} {...props}>
        {children}
    </div>
);

export default Container;
