import React from 'react';
import classNames from 'classnames';

import {GITHUB_CALLBACK_URL, GITHUB_CLIENT_ID, OAuthServiceTypeMap} from "../../Common/constants";

import {Icon} from "../../Elements";

import './GitHubLoginButton.scss';

const GITHUB_BASE_URL = 'https://github.com/login/oauth/authorize';
const GITHUB_REDIRECT_URL = `${GITHUB_CALLBACK_URL}/oauth/${OAuthServiceTypeMap.GITHUB}`;

const GitHubButton = ({className, label, ...props}) => {
    const GitHubData = {
        client_id: GITHUB_CLIENT_ID,
        redirect_uri: GITHUB_REDIRECT_URL,
        scope: 'user:email',
    };

    const searchParams = new URLSearchParams(GitHubData);

    const loginUri = `${GITHUB_BASE_URL}?${searchParams.toString()}`;

    return (
        <a className={classNames(
            "GitHubLoginButton",
            className,
        )} {...props} href={loginUri}>
            <Icon icon="github" className="GitHubIcon"/>
            <span>{label}</span>
        </a>
    )
};

GitHubButton.defaultProps = {
    label: 'Login with GitHub',
};

export default GitHubButton;
