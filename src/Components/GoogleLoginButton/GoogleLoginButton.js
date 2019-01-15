import React from 'react';
import {GoogleLogin} from 'react-google-login';

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

const GoogleLoginButton = () => {
    const responseGoogle = (response) => {
        console.log(response);
    };

    return (
        <GoogleLogin
            clientId="980264057874-3qrk46vt233qbq96d3816mhalkl7eefm.apps.googleusercontent.com"
            render={renderProps => (
                <GoogleButton onClick={renderProps.onClick}>This is my custom Google button</GoogleButton>
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
