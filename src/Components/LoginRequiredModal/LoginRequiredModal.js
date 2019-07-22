import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as authActions from "../../Core/Auth/Auth.actions";

import {initializeForm, updateFormField} from "../../Utils/FormHelpers";

import {Button, Dialog, Input, DialogBody, DialogHeader, Form} from '../../Elements';

import GitHubButton from "../GitHubLoginButton/GitHubLoginButton";
import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton";

import './LoginRequiredModal.scss';

class LoginRequiredModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginFailed: false,
        };

        initializeForm(this, {
            email: '',
            password: '',
        });
        this.handleFormUpdate = updateFormField.bind(this);
    }

    handleFormSubmit = async () => {
        const {formData: {email, password}, loginAttempts} = this.state;
        const {onClose, onLogin, authActions} = this.props;

        if (!email || !password) {
            return;
        }

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

            return;
        }

        onClose();

        if (onLogin) {
            onLogin();
        }
    };

    handleOAuth = async ({type, code}) => {
        const {authActions, onClose, onLogin} = this.props;

        const actionResponse = await authActions.authenticateOAuth(type, code);

        if (!actionResponse.success) {
            this.setState({
                loginFailed: true,
            });

            return;
        }

        onClose();

        if (onLogin) {
            onLogin();
        }
    };

    isLoginButtonDisabled = () => {
        const {formData} = this.state;

        return !formData.email || !formData.password;
    };

    render() {
        const {open, onClose} = this.props;
        const {formData} = this.state;

        return (
            <Dialog open={open} onClose={onClose} className="LoginRequiredModal">
                <DialogHeader>
                    <h3>Login Required</h3>
                </DialogHeader>
                <DialogBody>
                    <div className="DisplayFlex JustifyContentSpaceBetween">
                        <div className="SplitContentWrapper MarginRight4">
                            <Form onSubmit={this.handleFormSubmit}>
                                <Input icon="mail" label="E-mail" field="email" value={formData.email} onChange={this.handleFormUpdate} autoFocus/>
                                <Input icon="lock" type="password" label="Password" field="password" value={formData.password} onChange={this.handleFormUpdate}/>
                                <div className="MarginBottom3 TextAlignRight">
                                    <Link to="/account-recovery" className="InputAction">Forgot password?</Link>
                                </div>
                                <Button stretch disabled={this.isLoginButtonDisabled()} type="submit">
                                    <span>Login</span>
                                </Button>
                            </Form>
                        </div>
                        <div className="SplitContentWrapper">
                            <div className="MarginBottom2">
                                <GoogleLoginButton label="Continue with Google" onAuthentication={this.handleOAuth}/>
                            </div>
                            <div>
                                <GitHubButton label="Continue with GitHub"/>
                            </div>
                            <p className="TextAlignCenter">or</p>
                            <Button to="/register" outline stretch>
                                <span>Create an account</span>
                            </Button>
                        </div>
                    </div>
                </DialogBody>
            </Dialog>
        );
    }
}

LoginRequiredModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onLogin: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
    }
};

export default connect(
    null,
    mapDispatchToProps,
)(LoginRequiredModal);
