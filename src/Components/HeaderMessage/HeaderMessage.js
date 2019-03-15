import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './HeaderMessage.css';

const HeaderMessageColorClassMap = {
    purple: 'Purple',
};

const HeaderMessage = ({color, message}) => (
    <div className={classNames(
        "HeaderMessage",
        HeaderMessageColorClassMap[color],
    )}>
        <span>{message}</span>
    </div>
);

HeaderMessage.propTypes = {
    message: PropTypes.string.isRequired,
};

export default HeaderMessage;
