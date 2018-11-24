import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import {initializeForm, updateFormField} from "../../Utils/FormHelpers";
import * as authActions from "../../Core/Auth/Auth.actions";

import {Page, Container, Button, Form, Input} from "../../Elements";
import {EarlyAccessButton, GoogleLoginButton, GitHubLoginButton} from "../../Components";

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

        if (auth.loggedIn) {
            return <Redirect to="/dashboard"/>
        }

        return (
            <Page id="LoginPage" wholeScreenPage>
                <Container>
                    <div className="LoginPageContent">
                        <div className="LoginFormWrapper">
                            <Form onSubmit={this.handleFormSubmit}>
                                <Input label="E-mail" field="email" value={formData.email} onChange={this.handleFormUpdate}/>
                                <Input type="password" label="Password" field="password" value={formData.password} onChange={this.handleFormUpdate}/>
                                <Button outline color="secondary    " stretch type="submit">Login</Button>
                                <div className="ThirdPartLoginWrapper">
                                    <div className="ButtonWrapper">
                                        <GoogleLoginButton/>
                                    </div>
                                    <div className="ButtonWrapper">
                                        <GitHubLoginButton/>
                                    </div>
                                </div>
                            </Form>
                        </div>
                        <div className="SignUpWrapper">
                            <h2>Join our Private Alpha Program</h2>
                            <p>Join our limited private alpha program where we will be releasing updates to a small number of users as we develop them.</p>
                            <p>Based on your feedback Tenderly will evolve into the product that best suites your needs.</p>
                            <p>You can see a full list of <a href="https://tenderly.app#features">our features here</a>.</p>
                            <EarlyAccessButton color="secondary" outline={false} label="Sign up for Private Alpha access"/>
                        </div>
                    </div>
                </Container>
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
