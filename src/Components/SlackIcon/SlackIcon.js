import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import SlackIconImage from './slack-mark-monochrome.svg';

function SlackIcon({size, className}) {
    return (
        <div className={classNames(
            "SlackIcon",
            className
        )} style={{
            width: size,
            height: size,
        }}>
            <img src={SlackIconImage} style={{
                width: size,
                height: size,
            }} alt="Slack Icon"/>
        </div>
    );
}

SlackIcon.propTypes = {
    size: PropTypes.number.isRequired,
    className: PropTypes.string,
};

SlackIcon.defaultProps = {
    size: 16,
};

export default SlackIcon;
