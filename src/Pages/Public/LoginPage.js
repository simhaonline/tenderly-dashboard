import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

import {LocalStorageKeys} from "../../Common/constants";

import {initializeForm, updateFormField} from "../../Utils/FormHelpers";
import LocalStorage from "../../Utils/LocalStorage";

import {authActions} from "../../Core/actions";

import {Page, Button, Form, Input, Alert, PanelDivider} from "../../Elements";
import {GoogleLoginButton, GitHubLoginButton, ProjectInvitationPreview, TenderlyLogo} from "../../Components";

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

        if (flow === "project-invitation") {
            const searchParams = new URLSearchParams(redirectToState.search);

            flowData.projectSlug = searchParams.get('projectSlug') || null;
            flowData.projectName = searchParams.get('projectName') || null;
            flowData.projectOwner = searchParams.get('username') || null;
            flowData.inviterName = searchParams.get('inviterName') || null;
        }

        const loginButtonDisabled = this.isLoginButtonDisabled();

        return (
            <Page id="LoginPage" padding={false} wholeScreenPage>
                <div className="LoginPage__FeaturesContent">
                    <div>
                        <TenderlyLogo height={36}/>
                    </div>
                    <div className="LoginPage__FeaturesContent__Companies">
                        <div className="LoginPage__FeaturesContent__Companies__Title"><strong>Trusted</strong> by Blockchain Industry Leaders</div>
                        <div className="LoginPage__FeaturesContent__Companies__Logos">
                            <img alt="OpenZeppelin" src="/Assets/Companies/openzeppelin-logo.svg" className="LoginPage__FeaturesContent__Companies__CompanyLogo"/>
                            <img alt="DeFi Saver" src="/Assets/Companies/defi-saver-logo.svg" className="LoginPage__FeaturesContent__Companies__CompanyLogo"/>
                            <img alt="SuperBlocks" src="/Assets/Companies/superblocks-logo.svg" className="LoginPage__FeaturesContent__Companies__CompanyLogo"/>
                            <img alt="InstaDApp" src="/Assets/Companies/instadapp-logo.svg" className="LoginPage__FeaturesContent__Companies__CompanyLogo"/>
                            <img alt="2Key" src="/Assets/Companies/2key-logo.svg" className="LoginPage__FeaturesContent__Companies__CompanyLogo"/>
                        </div>
                    </div>
                </div>
                <div className="LoginPage__ContentDivider"/>
                <div className="LoginPage__Content">
                    <div className="LoginFormWrapper">
                        {flow === "project-invitation" && <ProjectInvitationPreview inviterName={flowData.inviterName} projectName={flowData.projectName}
                                                                                    projectOwner={flowData.projectOwner} projectSlug={flowData.projectSlug}/>}
                        <Form onSubmit={this.handleFormSubmit}>
                            {!flow && <h3 className="FormHeading">Sign in to Tenderly</h3>}
                            {flow === "project-invitation" && <h3 className="FormHeading">Login to Accept</h3>}
                            <p className="FormDescription">Enter your credentials below</p>
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
