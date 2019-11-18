import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import TelegramImage from './telegram-mark-monochrome.svg';

function Telegram({size, className}) {
    return (
        <div className={classNames(
            "Telegram",
            className
        )} style={{
            width: size,
            height: size,
        }}>
            <img src={TelegramImage} style={{
                width: size,
                height: size,
            }} alt="Telegram Icon"/>
        </div>
    );
}

Telegram.propTypes = {
    size: PropTypes.number.isRequired,
    className: PropTypes.string,
};

Telegram.defaultProps = {
    size: 16,
};

export default Telegram;
