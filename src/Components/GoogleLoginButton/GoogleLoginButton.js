import React from 'react';
import {GoogleLogin} from 'react-google-login';

import {GOOGLE_CLIENT_ID, OAuthServiceTypeMap} from "../../Common/constants";

import {Icon} from "../../Elements";

import './GoogleLoginButton.css';

const GoogleButton = ({label, ...props}) => {
    return (
        <button className="GoogleLoginButton" {...props}>
            <Icon icon="google" className="GoogleIcon"/>
            <span>{label}</span>
        </button>
    )
};

const GoogleLoginButton = ({onAuthentication, label}) => {
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
                <GoogleButton onClick={renderProps.onClick} label={label}/>
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

GoogleLoginButton.defaultProps = {
    label: 'Login with Google',
};

export default GoogleLoginButton;
