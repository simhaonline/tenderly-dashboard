import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import {initializeForm, updateFormField} from "../../Utils/FormHelpers";
import * as authActions from "../../Core/Auth/Auth.actions";

import {Page, Button, Form, Input} from "../../Elements";
import {EarlyAccessButton, GoogleLoginButton, GitHubLoginButton, FeatureFlag} from "../../Components";

import './LoginPage.css';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        initializeForm(this, {
            email: '',
            password: '',
        });
        this.handleFormUpdate = updateFormField.bind(this);
    }

    handleFormSubmit = () => {
        const {formData: {email, password}} = this.state;


        if (!email || !password) {
            return;
        }

        const {authActions} = this.props;

        authActions.loginUser(email, password);
    };

    isLoginButtonDisabled = () => {
        const {formData} = this.state;

        return !formData.email || !formData.password;
    };

    render() {
        const {formData} = this.state;
        const {auth} = this.props;

        if (auth.loggedIn && !auth.onboardingFinished) {
            return <Redirect to="/onboarding"/>
        } else if (auth.loggedIn) {
            return <Redirect to="/dashboard"/>
        }

        const loginButtonDisabled = this.isLoginButtonDisabled();

        return (
            <Page id="LoginPage" padding={false} wholeScreenPage>
                <div className="LoginPageContent">
                    <div className="LogoWrapper">
                        <h1 className="Logo">Tenderly</h1>
                    </div>
                    <div className="LoginFormWrapper">

                        <Form onSubmit={this.handleFormSubmit} className="LoginForm">
                            <h3 className="FormHeading">Welcome back!</h3>
                            <p className="FormDescription">Enter your credentials below to login into the dashboard.</p>
                            <Input icon="mail" label="E-mail" field="email" value={formData.email} onChange={this.handleFormUpdate} autoFocus/>
                            <Input icon="lock" type="password" label="Password" field="password" value={formData.password} onChange={this.handleFormUpdate}/>
                            <div className="LoginButtonWrapper">
                                <Button disabled={loginButtonDisabled} stretch type="submit">Login</Button>
                            </div>
                            <FeatureFlag>
                                <div className="ThirdPartLoginWrapper">
                                    <div className="ButtonWrapper">
                                        <GoogleLoginButton/>
                                    </div>
                                    <div className="ButtonWrapper">
                                        <GitHubLoginButton/>
                                    </div>
                                </div>
                            </FeatureFlag>
                        </Form>
                        <div className="SignUpWrapper">
                            <h2 className="SignUpHeading">Sign up for our Alpha Program!</h2>
                            <p className="SignUpText">Join our private alpha program where we will be releasing updates to a small number of users as we develop them.</p>
                            <p className="SignUpText">You can see a full list of <a href="https://tenderly.app#features">features here</a> that we plan to develop for you.</p>
                            <EarlyAccessButton label="Sign up for Alpha"/>
                        </div>
                    </div>
                    <div className="DocumentsWrapper">
                        <a className="DocumentLink" href="https://tenderly.app/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a>
                        <span className="Separator">•</span>
                        <a className="DocumentLink" href="https://tenderly.app/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                    </div>
                </div>
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        app: state.app,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginPage);
