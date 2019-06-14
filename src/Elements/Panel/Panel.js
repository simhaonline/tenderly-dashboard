import React from 'react';
import classNames from 'classnames';

import './Panel.scss';

const Panel = ({className, children, id}) => {
    return (
        <div className={classNames(
            "Panel",
            className
        )}>
            {children}
        </div>
    )
};

export default Panel;
