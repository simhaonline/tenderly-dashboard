import React from 'react';
import classNames from 'classnames';

import './Icon.css';

const Icon = ({icon, className, ...props}) => {
    const iconClass = `icon-${icon.toLowerCase()}`;

    return (
        <i className={classNames('TnIcon', iconClass, className)} {...props}/>
    )
};

export default Icon;
