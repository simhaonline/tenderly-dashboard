import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {initializeForm, updateFormField} from "../../Utils/FormHelpers";
import {ValidateEmail} from "../../Utils/FormValidators";

import {Card, CardHeading, Form, Button, Input, Alert, Icon} from "../../Elements";

import LogoImage from "../../Pages/Public/logo-vertical.svg";

import './AccountRecoveryForm.css';

class AccountRecoveryForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recoveryMailSent: false,
            recoveryMailSentEmail: '',
            error: false,
            errorMessage: '',
        };

        initializeForm(this, {
            email: '',
        });
        this.handleFormUpdate = updateFormField.bind(this);
    }

    /**
     * @returns {boolean}
     */
    isFormValid = () => {
        const {formData: {email}} = this.state;

        return !!email && ValidateEmail(email);
    };

    handleFormSubmit = async () => {
        const {onSubmit } = this.props;
        const {formData: {email}} = this.state;

        if (!this.isFormValid()) {
            return;
        }

        this.setState({
            recoveryMailSent: false,
            recoveryMailSentEmail: '',
            error: false,
            errorMessage: '',
        });

        const response = await onSubmit({
            email,
        });

        if (!response.success) {
            this.setState({
                error: true,
                errorMessage: 'There was an error trying to send the recovery e-mail. Please try again.',
            });

            return
        }

        this.setState({
            recoveryMailSent: true,
            recoveryMailSentEmail: email,
        });
    };

    render() {
        const {recoveryMailSent, error, errorMessage, recoveryMailSentEmail, formData: {email}} = this.state;

        return (
            <div className="AccountRecoveryForm">
                <div className="LogoWrapper">
                    <img className="AppLogo" src={LogoImage} alt="Tenderly Logo"/>
                </div>
                <Card>
                    <CardHeading>
                        <h3>Recover your account</h3>
                    </CardHeading>
                    {error && <Alert color="danger" animation={true}>{errorMessage}</Alert>}
                    {recoveryMailSent && <Alert color="info" animation={true}>Recovery e-mail has been successfully sent to {recoveryMailSentEmail}.</Alert>}
                    <p>We will send a recovery e-mail to this address with instructions how to recover your account.</p>
                    <Form onSubmit={this.handleFormSubmit}>
                        <Input autoFocus field="email" value={email} onChange={this.handleFormUpdate} label="E-mail" icon="mail"/>
                        <Button type="submit" disabled={!this.isFormValid()}>Recover Account</Button>
                    </Form>
                </Card>
                <div className="FormSubActions">
                    <Link to="/login" className="LoginLink">
                        <Icon icon="log-in" className="LoginLinkIcon"/>
                        Back to Login
                    </Link>
                </div>
            </div>
        );
    }
}

AccountRecoveryForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default AccountRecoveryForm;
