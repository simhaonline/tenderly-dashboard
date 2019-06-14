import React from 'react';
import classNames from 'classnames';

import './PageError.scss';

const PageError = ({children, className}) => {
    return (
        <div className={classNames(
            "PageError",
            className,
        )}>
            {children}
        </div>
    )
};

export default PageError;
