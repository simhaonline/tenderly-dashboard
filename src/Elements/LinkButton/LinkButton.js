import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './LinkButton.scss';

const LinkButton = ({children, className, onClick}) => {
    return (
        <span className={classNames(
            "LinkButton",
            className,
        )} onClick={onClick}>
            {children}
        </span>
    );
};

LinkButton.propTypes = {
    onClick: PropTypes.func,
};

LinkButton.defaultProps = {
    onClick: () => {},
};

export default LinkButton;
