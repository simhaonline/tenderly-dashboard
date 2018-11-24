import React from 'react';

import {Icon} from "../../Elements";

import './GitHubLoginButton.css';

const GitHubButton = ({...props}) => {
    return (
        <button className="GitHubLoginButton" {...props}>
            <Icon icon="github" className="GitHubIcon"/>
            <span>Login with GitHub</span>
        </button>
    )
};

export default GitHubButton;
