import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

import {initializeForm, updateFormField} from "../../Utils/FormHelpers";
import * as authActions from "../../Core/Auth/Auth.actions";

import {Page, Button, Form, Input, Alert, Icon} from "../../Elements";
import {GoogleLoginButton, GitHubLoginButton} from "../../Components";

import LogoImage from "./logo-vertical.svg";

import './LoginPage.css';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginFailed: false,
            loginAttempts: 0,
        };

        initializeForm(this, {
            email: '',
            password: '',
        });
        this.handleFormUpdate = updateFormField.bind(this);
    }

    handleFormSubmit = async () => {
        const {formData: {email, password}, loginAttempts} = this.state;

        if (!email || !password) {
            return;
        }

        const {authActions} = this.props;

        this.setState({
            loginFailed: false,
            loginAttempts: loginAttempts + 1,
        });

        const actionResponse = await authActions.loginUser(email, password);

        if (!actionResponse.success) {
            this.setState({
                loginFailed: true,
                formData: {
                    email,
                    password: '',
                }
            });
        }
    };

    /**
     * @param {string} service
     * @param {string} code
     */
    handleOAuth = async ({type, code}) => {
        const {authActions} = this.props;

        await authActions.authenticateOAuth(type, code)
    };

    isLoginButtonDisabled = () => {
        const {formData} = this.state;

        return !formData.email || !formData.password;
    };

    render() {
        const {formData, loginFailed} = this.state;
        const {auth, location: {state}} = this.props;

        if (auth.loggedIn && state && state.from) {
            return <Redirect to={state.from}/>;
        } else if (auth.loggedIn && !auth.onboardingFinished) {
            return <Redirect to="/onboarding"/>;
        } else if (auth.loggedIn) {
            return <Redirect to="/dashboard"/>;
        }

        const loginButtonDisabled = this.isLoginButtonDisabled();

        return (
            <Page id="LoginPage" padding={false} wholeScreenPage>
                <div className="LoginPageContent">
                    <div className="LoginFormWrapper">
                        <div className="LogoWrapper">
                            <img className="AppLogo" src={LogoImage} alt="Tenderly Logo"/>
                        </div>
                        <Form onSubmit={this.handleFormSubmit} className="LoginForm">
                            <h3 className="FormHeading">Welcome back</h3>
                            <p className="FormDescription">Enter your credentials below to login into the dashboard.</p>
                            <Input icon="mail" label="E-mail" field="email" value={formData.email} onChange={this.handleFormUpdate} autoFocus/>
                            <Input icon="lock" type="password" label="Password" field="password" value={formData.password} onChange={this.handleFormUpdate}/>
                            <div className="InputActionWrapper">
                                <Link to="/account-recovery" className="InputAction">Forgot password?</Link>
                            </div>
                            {loginFailed && <Alert color="danger" animation={true}>Incorrect email / password. Please try again.</Alert>}
                            <div className="LoginButtonWrapper">
                                <Button disabled={loginButtonDisabled} stretch type="submit">Login</Button>
                            </div>
                            <div className="ThirdPartLoginWrapper">
                                <div className="ButtonWrapper">
                                    <GoogleLoginButton onAuthentication={this.handleOAuth}/>
                                </div>
                                <div className="ButtonWrapper">
                                    <GitHubLoginButton/>
                                </div>
                            </div>
                        </Form>
                        <div className="DocumentsWrapper">
                            <a className="DocumentLink" href="https://tenderly.app/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a>
                            <span className="Separator">•</span>
                            <a className="DocumentLink" href="https://tenderly.app/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                        </div>
                        <div className="PocLinkWrapper">
                            <Link to="/register" className="PocLink">
                                <span>Create Account</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
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
