import React from 'react';

import {OAuthServiceLabelMap, OAuthServiceTypeMap, OAuthStatusMap} from "../../Common/constants";

import {GitHubLoginButton} from "../index";
import OAuthLoader from "../OAuthLoader/OAuthLoader";
import SetUsernameForm from "../SetUsernameForm/SetUsernameForm";

import './OAuthStatus.css';

const OAuthStatus = ({status, service, onUsernameSubmit = () => {}}) => {
    return (
        <div className="OAuthStatus">
            {status === OAuthStatusMap.FAILED && <div className="OAuthFailedWrapper">
                <div className="OAuthStatusMessage">
                    There was a problem trying to authenticate with {OAuthServiceLabelMap[service]}
                </div>
                {service === OAuthServiceTypeMap.GITHUB && <GitHubLoginButton label="Retry Authentication" className="OAuthGitHubButton"/>}
            </div>}
            {status === OAuthStatusMap.USERNAME_REQUIRED && <SetUsernameForm onSubmit={onUsernameSubmit}/>}
            {status === OAuthStatusMap.AUTHENTICATING && <OAuthLoader service={service}/>}
        </div>
    )
};

export default OAuthStatus;

