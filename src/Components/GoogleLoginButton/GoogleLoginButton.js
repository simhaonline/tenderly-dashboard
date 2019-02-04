import React from 'react';
import {GoogleLogin} from 'react-google-login';

import {GOOGLE_CLIENT_ID, OAuthServiceTypeMap} from "../../Common/constants";

import {Icon} from "../../Elements";

import './GoogleLoginButton.css';

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
            clientId={GOOGLE_CLIENT_ID}
            render={renderProps => (
                <GoogleButton onClick={renderProps.onClick}/>
            )}
            accessType="offline"
            responseType="code"
            prompt="select_account"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
        />
    );
};

export default GoogleLoginButton;
