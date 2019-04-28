import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './Icon.css';

const Icon = ({icon, className, ...props}) => {
    const iconClass = `icon-${icon.toLowerCase()}`;

    return (
        <i className={classNames('TnIcon', iconClass, className)} {...props}/>
    )
};

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default Icon;
