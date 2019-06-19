import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import _ from 'lodash';

import * as authActions from "../../Core/Auth/Auth.actions";
import {UsernameStatusMap} from "../../Common/constants";

import LogoImage from "../../Pages/Public/logo-vertical.svg";

import {initializeForm, updateFormField} from "../../Utils/FormHelpers";
import {Button, Panel, PanelContent, PanelDivider, Icon, Form, Checkbox, Input, Alert} from "../../Elements";
import {GitHubLoginButton, GoogleLoginButton, UsernameStatusInfo} from "../index";

import './RegisterForm.scss';

class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usernameStatus: UsernameStatusMap.UNKNOWN,
            registrationFailed: false,
            errorMessage: null,
        };
        initializeForm(this, {
            firstName: ' ',
            lastName: ' ',
            email: '',
            username: '',
            password: '',
            repeatPassword: '',
            termsAgreed: false,
        });
        this.handleFormUpdate = updateFormField.bind(this);
    }

    handleRegistrationSubmit = async () => {
        const {onSubmit} = this.props;
        const {formData} = this.state;

        if (formData.password !== formData.repeatPassword) {
            this.setState({
                registrationFailed: true,
                errorMessage: 'Passwords do not match!',
            });

            return;
        } else {
            this.setState({
                registrationFailed: false,
                errorMessage: null,
            });
        }

        const response = await onSubmit(formData);

        if (!response.success) {
            this.setState({
                registrationFailed: true,
                errorMessage: 'E-mail or username is already in use.',
            });
        }
    };

    isFormInvalid = () => {
        const {formData: {email, username, password, repeatPassword, termsAgreed}, usernameStatus} = this.state;

        return !email || !username || !password || !repeatPassword || !termsAgreed || usernameStatus !== UsernameStatusMap.VALID;
    };

    /**
     * @param {string} username
     */
    validateUsername = _.debounce(async (username) => {
        const {actions} = this.props;

        this.setState({
            usernameStatus: UsernameStatusMap.VALIDATING,
        });

        const response = await actions.validateUsername(username);

        if (response.success) {
            this.setState({
                usernameStatus: response.data.status,
            });
        }
    }, 1000);

    handleUsernameChange = async (field, value) => {
        this.handleFormUpdate(field, value);

        await this.validateUsername(value);
    };

    /**
     * @param {string} service
     * @param {string} code
     */
    handleOAuth = async ({type, code}) => {
        const {onOAuth} = this.props;

        await onOAuth(type, code)
    };

    render() {
        const {formData, usernameStatus, registrationFailed, errorMessage} = this.state;

        return (
            <div className="RegisterForm">
                <div className="FormStepsWrapper">
                    <div className="LogoWrapper">
                        <img className="AppLogo" src={LogoImage} alt="Tenderly Logo"/>
                    </div>
                    <Panel>
                        <PanelContent>
                            <Form onSubmit={this.handleRegistrationSubmit}>
                                <div className="OAuthButtonsWrapper">
                                    <GoogleLoginButton label="Register with Google" onAuthentication={this.handleOAuth}/>
                                    <GitHubLoginButton label="Register with GitHub"/>
                                </div>
                                <PanelDivider/>
                                {registrationFailed && <Alert color="danger" animation={true}>{errorMessage}</Alert>}
                                <Input autoFocus field="email" onChange={this.handleFormUpdate} value={formData.email} label="E-mail" icon="mail"/>
                                <Input field="username" onChange={this.handleUsernameChange} value={formData.username} label="Username" icon="user"/>
                                {usernameStatus !== UsernameStatusMap.UNKNOWN && <UsernameStatusInfo status={usernameStatus}/>}
                                <PanelDivider/>
                                <Input icon="lock" type="password" label="Password" field="password" value={formData.password} onChange={this.handleFormUpdate}/>
                                <Input icon="lock" type="password" label="Repeat password" field="repeatPassword" value={formData.repeatPassword} onChange={this.handleFormUpdate}/>
                                <div>
                                    <Checkbox field="termsAgreed" value={formData.termsAgreed} onChange={this.handleFormUpdate} renderLabel={() =>
                                        <span>I agree to the Tenderly <a className="DocumentLink" href="https://tenderly.dev/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a className="DocumentLink" href="https://tenderly.dev/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></span>
                                    }/>
                                </div>
                                <div className="FormActionsWrapper">
                                    <Button onClick={this.handleRegistrationSubmit} disabled={this.isFormInvalid()}>
                                        <span>Create Account</span>
                                    </Button>
                                </div>
                            </Form>
                        </PanelContent>
                    </Panel>
                    <div className="FormSubActions">
                        <Link to="/login" className="LoginLink">
                            <Icon icon="log-in" className="LoginLinkIcon"/>
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

RegisterForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onOAuth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(authActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RegisterForm);
