import React from 'react';
import PropTypes from 'prop-types';

import {OAuthServiceTypeMap, SLACK_CLIENT_ID, SLACK_REDIRECT_URI} from "../../Common/constants";

import {Button, Icon} from "../../Elements";

const SLACK_OAUTH_URI = 'https://slack.com/oauth/authorize';
const SLACK_OAUTH_REDIRECT_URI = `${SLACK_REDIRECT_URI}/oauth/${OAuthServiceTypeMap.SLACK}`;

const SlackConnectButton = ({label, redirectBack, redirectTo}) => {
    const SlackGetParameters = {
        client_id: SLACK_CLIENT_ID,
        redirect_uri: SLACK_OAUTH_REDIRECT_URI,
        scope: 'channels:history,groups:history,channels:read,chat:write:bot,groups:read,incoming-webhook',
    };

    if (redirectTo) {
        SlackGetParameters.redirect_uri += `?redirectTo=${redirectTo}`;
    } else if (redirectBack) {
        SlackGetParameters.redirect_uri += `?redirectTo=${window.location.pathname}`;
    }

    const searchParams = new URLSearchParams(SlackGetParameters);

    const oauthUri = `${SLACK_OAUTH_URI}?${searchParams.toString()}`;

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
    redirectTo: PropTypes.string,
};

SlackConnectButton.defaultProps = {
    label: 'Connect Slack',
};

export default SlackConnectButton;
