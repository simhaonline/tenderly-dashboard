import React from 'react';
import classNames from 'classnames';

import './Icon.css';

const Icon = ({icon, ...props}) => {
    const iconClass = `icon-${icon.toLowerCase()}`;

    return (
        <i className={classNames('TnIcon', iconClass)} {...props}/>
    )
};

export default Icon;
