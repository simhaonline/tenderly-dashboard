import React from 'react';

import {APP_BASE_URL, GITHUB_CLIENT_ID, OAuthServiceTypeMap} from "../../Common/constants";

import {Icon} from "../../Elements";

import './GitHubLoginButton.css';

const GITHUB_BASE_URL = 'https://github.com/login/oauth/authorize';
const GITHUB_REDIRECT_URL = `${APP_BASE_URL}/oauth/${OAuthServiceTypeMap.GITHUB}`;

const GitHubButton = ({onAuthentication, ...props}) => {
    const GitHubData = {
        client_id: GITHUB_CLIENT_ID,
        redirect_uri: GITHUB_REDIRECT_URL,
    };

    const searchParams = new URLSearchParams(GitHubData);

    const loginUri = `${GITHUB_BASE_URL}?${searchParams.toString()}`;

    return (
        <a className="GitHubLoginButton" {...props} href={loginUri}>
            <Icon icon="github" className="GitHubIcon"/>
            <span>Login with GitHub</span>
        </a>
    )
};

export default GitHubButton;
