import React, {Component} from 'react';
import PropTypes from 'prop-types';

import LogoImage from "../../Pages/Public/logo-vertical.svg";

import './ResetPasswordForm.css';

import {Card, CardHeading, Form, Button, Input, Alert, Icon} from "../../Elements";
import {initializeForm, updateFormField} from "../../Utils/FormHelpers";

class ResetPasswordForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newPasswordSet: false,
            error: false,
            errorMessage: '',
        };

        initializeForm(this, {
            password: '',
            repeatedPassword: '',
        });
        this.handleFormUpdate = updateFormField.bind(this);
    }

    isFormValid = () => {
        const {formData: {password, repeatedPassword}} = this.state;

        if (!password || !repeatedPassword) {
            return false;
        }

        return password === repeatedPassword;
    };

    handleFormSubmit = async () => {
        if (!this.isFormValid()) {
            this.setState({
                error: true,
                errorMessage: 'The new passwords do not match.',
            });

            return;
        }

        const {formData: {password}} = this.state;
        const {onSubmit} = this.props;

        this.setState({
            error: false,
            errorMessage: '',
        });

        const response = await onSubmit({
            password,
        });

        if (!response.success) {
            this.setState({
                error: true,
                errorMessage: 'There was a problem trying to set your new password. Please try again.',
            });

            return;
        }

        this.setState({
            newPasswordSet: true,
        })
    };

    render() {
        const {error, errorMessage, newPasswordSet, formData: {password, repeatedPassword}} = this.state;


        return (
            <div className="ResetPasswordForm">
                <div className="LogoWrapper">
                    <img className="AppLogo" src={LogoImage} alt="Tenderly Logo"/>
                </div>
                <Card>
                    <CardHeading>
                        <h3>Reset Account Password</h3>
                    </CardHeading>
                    {!newPasswordSet && <Form onSubmit={this.handleFormSubmit}>
                        {error && <Alert animation={true} color="danger">{errorMessage}</Alert>}
                        <p>Set your new password for your account.</p>
                        <Input autoFocus type="password" field="password" value={password} onChange={this.handleFormUpdate} label="New password"/>
                        <Input type="password" field="repeatedPassword" value={repeatedPassword} onChange={this.handleFormUpdate} label="Repeat new password"/>
                        <Button type="submit" disabled={!password || !repeatedPassword}>
                            <span>Set Password</span>
                        </Button>
                    </Form>}
                    {newPasswordSet && <div>
                        <Alert color="success">You new password has been successfully set. You can now login to the dashboard with your new password.</Alert>
                        <Button to="/login" color="secondary" outline>
                            <Icon icon="log-in"/>
                            <span>Login</span>
                        </Button>
                    </div>}
                </Card>
            </div>
        );
    }
}

ResetPasswordForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default ResetPasswordForm;
