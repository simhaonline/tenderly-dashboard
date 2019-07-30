import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const LinkButton = ({children, className, onClick}) => {
    return (
        <span className={classNames(
            "LinkText",
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
