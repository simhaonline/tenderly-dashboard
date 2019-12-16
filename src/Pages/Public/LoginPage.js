import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

import {LocalStorageKeys, LoginFlowTypes} from "../../Common/constants";

import {initializeForm, updateFormField} from "../../Utils/FormHelpers";
import LocalStorage from "../../Utils/LocalStorage";

import {authActions} from "../../Core/actions";

import {Page, Button, Form, Input, Alert, Panel, PanelContent, PanelDivider} from "../../Elements";
import {GoogleLoginButton, GitHubLoginButton, ProjectInvitationPreview} from "../../Components";

import LogoImage from "./logo-vertical.svg";

import './LoginPage.scss';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        const {location} = props;

        let redirectToState;
        let loginFlow;

        if (LocalStorage.getItem(LocalStorageKeys.LOGIN_REDIRECT)) {
            redirectToState = LocalStorage.getItem(LocalStorageKeys.LOGIN_REDIRECT);

            LocalStorage.removeItem(LocalStorageKeys.LOGIN_REDIRECT);
        }

        if (LocalStorage.getItem(LocalStorageKeys.LOGIN_FLOW)) {
            loginFlow = LocalStorage.getItem(LocalStorageKeys.LOGIN_FLOW);

            LocalStorage.removeItem(LocalStorageKeys.LOGIN_FLOW);
        }

        if (location.state && location.state.from) {
            redirectToState = location.state.from;
        }

        if (location.state && location.state.flow) {
            loginFlow = location.state.flow;
        }

        this.state = {
            loginFailed: false,
            loginAttempts: 0,
            flow: loginFlow,
            redirectToState,
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

    handleBeforeGitHubOAuth = () => {
        const {redirectToState, flow} = this.state;

        if (redirectToState) {
            LocalStorage.setItem(LocalStorageKeys.LOGIN_REDIRECT, redirectToState);
        }

        if (flow) {
            LocalStorage.setItem(LocalStorageKeys.LOGIN_FLOW, flow);
        }
    };

    render() {
        const {formData, loginFailed, flow, redirectToState} = this.state;
        const {auth} = this.props;

        if (auth.loggedIn) {
            if (!auth.usernameSet) {
                return <Redirect to={{
                    pathname: "/onboarding",
                    state: {
                        redirectTo: redirectToState ? redirectToState : "/dashboard",
                    },
                }}/>;
            }

            if (redirectToState) {
                return <Redirect to={redirectToState}/>;
            }

            return <Redirect to="/dashboard"/>;
        }

        let flowData = {};

        if (flow === LoginFlowTypes.ACCEPT_INVITATION) {
            const searchParams = new URLSearchParams(redirectToState.search);

            flowData.projectSlug = searchParams.get('projectSlug') || null;
            flowData.projectName = searchParams.get('projectName') || null;
            flowData.projectOwner = searchParams.get('username') || null;
            flowData.inviterName = searchParams.get('inviterName') || null;
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
                        {flow === LoginFlowTypes.ACCEPT_INVITATION && <ProjectInvitationPreview inviterName={flowData.inviterName} projectName={flowData.projectName}
                                                                                    projectOwner={flowData.projectOwner} projectSlug={flowData.projectSlug}/>}
                        <Panel className="LoginFormPanel">
                            <PanelContent>
                                <Form onSubmit={this.handleFormSubmit}>
                                    {!flow && <h3 className="FormHeading">Welcome back</h3>}
                                    {flow === LoginFlowTypes.ACCEPT_INVITATION && <h3 className="FormHeading">Login to Accept</h3>}
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
                                            <GitHubLoginButton onClick={this.handleBeforeGitHubOAuth}/>
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
