import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import _ from 'lodash';

import * as authActions from "../../Core/Auth/Auth.actions";

import LogoImage from "../../Pages/Public/logo-vertical.svg";

import {initializeForm, updateFormField} from "../../Utils/FormHelpers";
import {Button, Card, Icon, Form, Checkbox, Input} from "../../Elements";
import {GitHubLoginButton, GoogleLoginButton} from "../index";

import './RegisterForm.css';

const UsernameStatusMap = {
    UNKNOWN: 'unknown',
    INVALID: 'invalid',
    TAKEN: 'taken',
    VALID: 'valid',
    VALIDATING: 'validating',
};

class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usernameStatus: UsernameStatusMap.UNKNOWN,
        };
        initializeForm(this, {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            repeatPassword: '',
            termsAgreed: false,
        });
        this.handleFormUpdate = updateFormField.bind(this);
    }

    handleRegistrationSubmit = () => {
        const {onSubmit} = this.props;
        const {formData} = this.state;

        onSubmit(formData);
    };

    isFormInvalid = () => {
        const {formData: {firstName, lastName, email, username, password, repeatPassword, termsAgreed}, usernameStatus} = this.state;

        return !firstName || !lastName || !email || !username || !password || !repeatPassword || !termsAgreed || usernameStatus !== UsernameStatusMap.VALID;
    };

    /**
     * @param {string} username
     */
    validateUsername = _.debounce(async (username) => {
        if (username.length === 0) {
            this.setState({
                usernameStatus: UsernameStatusMap.UNKNOWN,
            });

            return;
        }


        const {actions} = this.props;

        this.setState({
            usernameStatus: UsernameStatusMap.VALIDATING,
        });

        const response = await actions.validateUsername(username);

        if (response.success) {
            if (response.data.isTaken) {
                this.setState({
                    usernameStatus: UsernameStatusMap.TAKEN,
                });
            } else if (!response.data.isTaken) {
                this.setState({
                    usernameStatus: UsernameStatusMap.VALID,
                });
            }
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
        const {formData, usernameStatus} = this.state;

        return (
            <div className="RegisterForm">
                <div className="FormStepsWrapper">
                    <div className="LogoWrapper">
                        <img className="AppLogo" src={LogoImage} alt="Tenderly Logo"/>
                    </div>
                    <Card className="RegisterAccountForm">
                        <Form onSubmit={this.handleRegistrationSubmit}>
                            <div className="NameInputWrapper">
                                <div className="NameInputColumn">
                                    <Input field="firstName" autoFocus onChange={this.handleFormUpdate} value={formData.firstName} label="First name"/>
                                </div>
                                <div className="NameInputColumn">
                                    <Input field="lastName" onChange={this.handleFormUpdate} value={formData.lastName} label="Last name"/>
                                </div>
                            </div>
                            <Input field="email" onChange={this.handleFormUpdate} value={formData.email} label="E-mail" icon="mail"/>
                            <hr/>
                            <Input field="username" onChange={this.handleUsernameChange} value={formData.username} label="Username" icon="user"/>
                            {usernameStatus !== UsernameStatusMap.UNKNOWN && <div className="UsernameStatusWrapper">
                                {usernameStatus === UsernameStatusMap.VALIDATING && <div className="UsernameStatusText">
                                    <Icon icon="loader" className="UsernameValidationIcon"/>
                                    <span>Checking username...</span>
                                </div>}
                                {usernameStatus === UsernameStatusMap.INVALID && <div className="InvalidUsername UsernameStatusText">
                                    <Icon icon="alert-triangle" className="UsernameValidationIcon"/>
                                    <span></span>
                                </div>}
                                {usernameStatus === UsernameStatusMap.TAKEN && <div className="TakenUsername UsernameStatusText">
                                    <Icon icon="info" className="UsernameValidationIcon"/>
                                    <span>Unfortunately this username has already been taken.<br/>Please try another one.</span>
                                </div>}
                                {usernameStatus === UsernameStatusMap.VALID && <div className="ValidUsername UsernameStatusText">
                                    <Icon icon="check-circle" className="UsernameValidationIcon"/>
                                    <span>This username is available.</span>
                                </div>}
                            </div>}
                            <hr/>
                            <Input icon="lock" type="password" label="Password" field="password" value={formData.password} onChange={this.handleFormUpdate}/>
                            <Input icon="lock" type="password" label="Repeat password" field="repeatPassword" value={formData.repeatPassword} onChange={this.handleFormUpdate}/>
                            <div>
                                <Checkbox field="termsAgreed" value={formData.termsAgreed} onChange={this.handleFormUpdate} renderLabel={() =>
                                    <span>I agree to the Tenderly <a className="DocumentLink" href="https://tenderly.app/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a className="DocumentLink" href="https://tenderly.app/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></span>
                                }/>
                            </div>
                            <div className="FormActionsWrapper">
                                <Button onClick={this.handleRegistrationSubmit} disabled={this.isFormInvalid()}>
                                    <span>Create Account</span>
                                </Button>
                            </div>
                            <hr/>
                            <div className="OAuthButtonsWrapper">
                                <GoogleLoginButton label="Register with Google" onAuthentication={this.handleOAuth}/>
                                <GitHubLoginButton label="Register with GitHub"/>
                            </div>
                        </Form>
                    </Card>
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
