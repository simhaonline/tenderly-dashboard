import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

import {LocalStorageKeys, LoginFlowTypes} from "../../Common/constants";

import {initializeForm, updateFormField} from "../../Utils/FormHelpers";
import LocalStorage from "../../Utils/LocalStorage";

import {authActions} from "../../Core/actions";

import {Page, Button, Form, Alert, Icon} from "../../Elements";
import {
    GoogleLoginButton,
    GitHubLoginButton,
    ProjectInvitationPreview,
    TenderlyLogo, TenderlyFeaturesDemo,
} from "../../Components";

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
            showPassword: false,
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

    toggleShowPassword = () => {
        const {showPassword} = this.state;

        this.setState({
            showPassword: !showPassword,
        });
    };

    render() {
        const {formData, showPassword, loginFailed, flow, redirectToState} = this.state;
        const {auth} = this.props;

        if (auth.loggedIn) {
            if (!auth.usernameSet) {
                return <Redirect to={{
                    pathname: "/onboarding",
                    state: {
                        redirectTo: redirectToState ? redirectToState : "/",
                    },
                }}/>;
            }

            if (redirectToState) {
                return <Redirect to={redirectToState}/>;
            }

            return <Redirect to="/"/>;
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
            <Page id="LoginPage" padding={false} wholeScreenPage>
                <div className="LoginPage__FeaturesContent">
                    <div className="LoginPage__FeaturesContent__Heading">
                        <Link to="/">
                            <TenderlyLogo height={36}/>
                        </Link>
                    </div>
                    <div className="LoginPage__FeaturesContent__FeatureDemo">
                        <TenderlyFeaturesDemo/>
                    </div>
                    <div className="LoginPage__FeaturesContent__Companies">
                        <div className="LoginPage__FeaturesContent__Companies__Title"><strong>Trusted</strong> by Blockchain Industry Leaders</div>
                        <div className="LoginPage__FeaturesContent__Companies__Logos">
                            <img alt="OpenZeppelin" src="/Assets/Companies/openzeppelin-logo.svg" className="LoginPage__FeaturesContent__Companies__CompanyLogo"/>
                            <img alt="DeFi Saver" src="/Assets/Companies/defi-saver-logo.svg" className="LoginPage__FeaturesContent__Companies__CompanyLogo"/>
                            <img alt="SuperBlocks" style={{height: '36px'}} src="/Assets/Companies/superblocks-logo.svg" className="LoginPage__FeaturesContent__Companies__CompanyLogo"/>
                            <img alt="InstaDApp" src="/Assets/Companies/instadapp-logo.svg" className="LoginPage__FeaturesContent__Companies__CompanyLogo"/>
                            <img alt="2Key" src="/Assets/Companies/2key-logo.svg" className="LoginPage__FeaturesContent__Companies__CompanyLogo"/>
                        </div>
                    </div>
                </div>
                <div className="LoginPage__ContentDivider"/>
                <div className="LoginPage__Content">
                    <div className="LoginFormWrapper">
                        {flow === LoginFlowTypes.ACCEPT_INVITATION && <ProjectInvitationPreview inviterName={flowData.inviterName} projectName={flowData.projectName}
                                                                                    projectOwner={flowData.projectOwner} projectSlug={flowData.projectSlug}/>}
                        <Form onSubmit={this.handleFormSubmit}>
                            {!flow && <h3 className="FormHeading">Sign in to Tenderly</h3>}
                            {flow === LoginFlowTypes.ACCEPT_INVITATION && <h3 className="FormHeading">Login to Accept</h3>}
                            <p className="FormDescription">Don't have an account? <Link to={{
                                pathname: "/register",
                                state: {
                                    from: redirectToState,
                                },
                            }}>Create an account</Link></p>
                            {loginFailed && <Alert color="warning" animation={true}>Incorrect login credentials. Please try again.</Alert>}
                            <div className="LoginPage__Content__Form__InputWrapper">
                                <label htmlFor="login" className="LoginPage__Content__Form__Label">E-mail / Username</label>
                                <input className="LoginPage__Content__Form__Input" id="login" placeholder="troybarnes" name="login" value={formData.email} onChange={e => {
                                    this.handleFormUpdate("email", e.target.value);
                                }} autoFocus/>
                            </div>
                            <div className="LoginPage__Content__Form__InputWrapper">
                                <label htmlFor="password" className="LoginPage__Content__Form__Label">Password</label>
                                <input className="LoginPage__Content__Form__Input" id="password" name="password" placeholder="#sixseasonsandamovie" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={e => {
                                    this.handleFormUpdate("password", e.target.value);
                                }}/>
                                <div onClick={this.toggleShowPassword} className={`LoginPage__Content__Form__IconButton ${showPassword && 'LoginPage__Content__Form__IconButton--Active'}`}>
                                    {!showPassword && <Icon icon="eye" />}
                                    {showPassword && <Icon icon="eye-off" />}
                                </div>

                            </div>
                            <div className="InputActionWrapper">
                                <Link to="/account-recovery" className="InputAction">Forgot your password?</Link>
                            </div>
                            <Button color="secondary" className="LoginPage__Content__Form__SubmitButton" disabled={loginButtonDisabled} size="large" type="submit">Sign in</Button>
                            <div className="TextAlignCenter MarginBottom2 LightText">Or you can continue with one of the following services</div>
                            <div className="ThirdPartLoginWrapper">
                                <div className="ButtonWrapper">
                                    <GoogleLoginButton label="Continue with Google" onAuthentication={this.handleOAuth}/>
                                </div>
                                <div className="ButtonWrapper">
                                    <GitHubLoginButton label="Continue with GitHub" onClick={this.handleBeforeGitHubOAuth}/>
                                </div>
                            </div>
                        </Form>
                        <div className="DocumentsWrapper">
                            <a className="DocumentLink" href="https://tenderly.dev/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a>
                            <span className="Separator">•</span>
                            <a className="DocumentLink" href="https://tenderly.dev/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
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
