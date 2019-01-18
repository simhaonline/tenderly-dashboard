import React from 'react';
import {GoogleLogin} from 'react-google-login';

import {Icon} from "../../Elements";

import './GoogleLoginButton.css';
import {OAuthServiceTypeMap} from "../../Common/constants";

const GoogleButton = ({...props}) => {
    return (
        <button className="GoogleLoginButton" {...props}>
            <Icon icon="google" className="GoogleIcon"/>
            <span>Login with Google</span>
        </button>
    )
};

const GoogleLoginButton = ({onAuthentication}) => {
    const responseGoogle = (response) => {
        const {code, error} = response;

        if (error) {
            return;
        }

        if (onAuthentication && code) {
            onAuthentication({
                type: OAuthServiceTypeMap.GOOGLE,
                code,
            })
        }
    };

    return (
        <GoogleLogin
            clientId="980264057874-3qrk46vt233qbq96d3816mhalkl7eefm.apps.googleusercontent.com"
            render={renderProps => (
                <GoogleButton onClick={renderProps.onClick}/>
            )}
            accessType="offline"
            responseType="code"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
        />
    );
};

export default GoogleLoginButton;
