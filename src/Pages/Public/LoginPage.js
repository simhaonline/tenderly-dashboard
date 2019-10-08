import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

import {initializeForm, updateFormField} from "../../Utils/FormHelpers";

import {authActions} from "../../Core/actions";

import {Page, Button, Form, Input, Alert, Panel, PanelContent, PanelDivider} from "../../Elements";
import {GoogleLoginButton, GitHubLoginButton} from "../../Components";

import LogoImage from "./logo-vertical.svg";

import './LoginPage.scss';

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
            inProgress: true,
            loginAttempts: loginAttempts + 1,
        });

        const actionResponse = await authActions.loginUser(email, password);

        if (!actionResponse.success) {
            this.setState({
                loginFailed: true,
                inProgress: false,
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

        const oAuthResponse = await authActions.authenticateOAuth(type, code);

        if (!oAuthResponse.success) {
            this.setState({
                loginFailed: true,
            });
        }
    };

    isLoginButtonDisabled = () => {
        const {formData, inProgress} = this.state;

        return !formData.email || !formData.password || inProgress;
    };

    render() {
        const {formData, loginFailed} = this.state;
        const {auth, location: {state}} = this.props;

        if (auth.loggedIn) {
            if (!auth.usernameSet) {
                return <Redirect to={{
                    pathname: "/onboarding",
                    state: {
                        redirectTo: state && state.from ? state.from : "/dashboard",
                    },
                }}/>;
            }

            if (state && state.from) {
                return <Redirect to={state.from}/>;
            }

            return <Redirect to="/dashboard"/>;
        }

        const loginButtonDisabled = this.isLoginButtonDisabled();

        return (
            <Page id="LoginPage" padding={false}>
                <div className="LoginPageContent">
                    <div className="LoginFormWrapper">
                        <div className="LogoWrapper">
                            <a href="https://tenderly.dev">
                                <img className="AppLogo" src={LogoImage} alt="Tenderly Logo"/>
                            </a>
                        </div>
                        <Panel className="LoginFormPanel">
                            <PanelContent>
                                <Form onSubmit={this.handleFormSubmit}>
                                    <h3 className="FormHeading">Welcome back</h3>
                                    <p className="FormDescription">Enter your credentials below to login.</p>
                                    <Input icon="mail" label="E-mail" field="email" value={formData.email} onChange={this.handleFormUpdate} autoFocus/>
                                    <Input icon="lock" type="password" label="Password" field="password" value={formData.password} onChange={this.handleFormUpdate}/>
                                    <div className="InputActionWrapper">
                                        <Link to="/account-recovery" className="InputAction">Forgot password?</Link>
                                    </div>
                                    {loginFailed && <Alert color="danger" animation={true}>Incorrect email / password. Please try again.</Alert>}
                                    <PanelDivider/>
                                    <Button color="secondary" disabled={loginButtonDisabled} stretch type="submit">Login</Button>
                                    <PanelDivider/>
                                    <div className="ThirdPartLoginWrapper">
                                        <div className="ButtonWrapper">
                                            <GoogleLoginButton onAuthentication={this.handleOAuth}/>
                                        </div>
                                        <div className="ButtonWrapper">
                                            <GitHubLoginButton/>
                                        </div>
                                    </div>
                                </Form>
                            </PanelContent>
                        </Panel>
                        <div className="DocumentsWrapper">
                            <a className="DocumentLink" href="https://tenderly.dev/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a>
                            <span className="Separator">•</span>
                            <a className="DocumentLink" href="https://tenderly.dev/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                        </div>
                        <div className="PocLinkWrapper">
                            <Button color="secondary" to="/register">
                                <span>Create Account</span>
                            </Button>
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
