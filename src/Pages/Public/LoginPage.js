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

    render() {
        const {formData} = this.state;
        const {auth} = this.props;

        if (auth.loggedIn && !auth.onboardingFinished) {
            return <Redirect to="/onboarding"/>
        } else if (auth.loggedIn) {
            return <Redirect to="/dashboard"/>
        }

        return (
            <Page id="LoginPage" padding={false}>
                <div className="LoginPageContent">
                    <div className="LoginFormWrapper">
                        <Form onSubmit={this.handleFormSubmit} className="LoginForm">
                            <h3 className="FormHeading">Welcome back!</h3>
                            <Input icon="mail" label="E-mail" field="email" value={formData.email} onChange={this.handleFormUpdate}/>
                            <Input icon="lock" type="password" label="Password" field="password" value={formData.password} onChange={this.handleFormUpdate}/>
                            <div className="LoginButtonWrapper">
                                <Button stretch type="submit">Login</Button>
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
                        <div className="DocumentsWrapper">
                            <a className="DocumentLink" href="https://tenderly.app/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a>
                            <span className="Separator">•</span>
                            <a className="DocumentLink" href="https://tenderly.app/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                        </div>
                    </div>
                    <div className="SignUpWrapper">
                        <h2>Join our Private Alpha Program</h2>
                        <p>Join our limited private alpha program where we will be releasing updates to a small number of users as we develop them.</p>
                        <p>Based on your feedback Tenderly will evolve into the product that best suites your needs.</p>
                        <p>You can see a full list of <a href="https://tenderly.app#features">our features here</a>.</p>
                        <EarlyAccessButton color="secondary" label="Sign up for Private Alpha access"/>
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
