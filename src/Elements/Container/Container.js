import React from 'react';
import classNames from 'classnames';

import './Container.scss';

const Container = ({children, boxed, className, ...props}) => (
    <div className={classNames(
        "Container",
        className,
        {
            "Container--Boxed": boxed,
        },
    )} {...props}>
        {children}
    </div>
);

export default Container;
