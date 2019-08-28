import React from 'react';
import {Link} from "react-router-dom";

import {OAuthServiceLabelMap, OAuthServiceTypeMap, OAuthStatusMap} from "../../Common/constants";

import {GitHubLoginButton, SlackConnectButton} from "../index";
import OAuthLoader from "../OAuthLoader/OAuthLoader";

import './OAuthStatus.scss';

const OAuthStatus = ({status, service, redirectTo, loggedIn}) => {
    return (
        <div className="OAuthStatus">
            {status === OAuthStatusMap.FAILED && <div className="OAuthFailedWrapper">
                <div className="OAuthStatusMessage">
                    There was a problem trying to authenticate with {OAuthServiceLabelMap[service]}
                </div>
                {service === OAuthServiceTypeMap.GITHUB && <GitHubLoginButton label="Retry Authentication" className="OAuthGitHubButton"/>}
                {service === OAuthServiceTypeMap.SLACK && <SlackConnectButton redirectTo={redirectTo} label="Retry Connection"/>}
                {!loggedIn && <div className="OAuthLinks">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>}
                {loggedIn && <div className="OAuthLinks">
                    <Link to="/login">Dashboard</Link>
                    {!!redirectTo && <Link to={redirectTo}>Back to previous page</Link>}
                </div>}
            </div>}
            {status === OAuthStatusMap.AUTHENTICATING && <OAuthLoader service={service}/>}
        </div>
    )
};

export default OAuthStatus;

