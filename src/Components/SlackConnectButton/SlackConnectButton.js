import React from 'react';
import PropTypes from 'prop-types';

import {SLACK_CLIENT_ID, SLACK_REDIRECT_URI} from "../../Common/constants";

import {Button, Icon} from "../../Elements";

const SLACK_OAUTH_URI = 'https://slack.com/oauth/authorize';

const SlackConnectButton = ({label, redirectBack}) => {
    const SlackGetParameters = {
        client_id: SLACK_CLIENT_ID,
        redirect_uri: SLACK_REDIRECT_URI,
        scope: 'incoming-webhook',
    };

    if (redirectBack) {
        SlackGetParameters.redirect_uri += window.location.pathname;
    }

    const searchParams = new URLSearchParams(SlackGetParameters);

    const oauthUri = `${SLACK_OAUTH_URI}?${searchParams.toString()}`;

    console.log(oauthUri);

    return (
        <Button href={oauthUri}>
            <Icon icon="slack"/>
            <span>{label}</span>
        </Button>
    )
};

SlackConnectButton.propTypes = {
    label: PropTypes.string,
    redirectBack: PropTypes.bool,
};

SlackConnectButton.defaultProps = {
    label: 'Connect Slack',
};

export default SlackConnectButton;
