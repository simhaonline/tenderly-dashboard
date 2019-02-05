import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

import LogoImage from "../../Pages/Public/logo-vertical.svg";

import {initializeForm, updateFormField} from "../../Utils/FormHelpers";
import {Button, Card, Form, Checkbox, Input} from "../../Elements";

import './RegisterForm.css';

class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentStep: 'account',
        };
        initializeForm(this, {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            repeatPassword: '',
            termsAgreed: false,
            registered: false,
        });
        this.handleFormUpdate = updateFormField.bind(this);
    }

                handleRegistrationSubmit = () => {
        this.setState({
            registered: true,
        });
    };

    isFormInvalid = () => {
        const {formData: {firstName, lastName, email, username, password, repeatPassword, termsAgreed}} = this.state;

        return !firstName || !lastName || !email || !username || !password || !repeatPassword || !termsAgreed;
    };

    render() {
        const {formData, registered} = this.state;

        if (registered) {
            return <Redirect to={'/dashboard'}/>
        }

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
                                    <Input field="firstName" onChange={this.handleFormUpdate} value={formData.firstName} label="First name"/>
                                </div>
                                <div className="NameInputColumn">
                                    <Input field="lastName" onChange={this.handleFormUpdate} value={formData.lastName} label="Last name"/>
                                </div>
                            </div>
                            <Input field="email" onChange={this.handleFormUpdate} value={formData.email} label="E-mail" icon="mail"/>
                            <hr/>
                            <Input field="username" onChange={this.handleFormUpdate} value={formData.username} label="Username" icon="user"/>
                            <hr/>
                            <Input icon="lock" type="password" label="Password" field="password" value={formData.password} onChange={this.handleFormUpdate}/>
                            <Input icon="lock" type="password" label="Repeat password" field="repeatPassword" value={formData.repeatPassword} onChange={this.handleFormUpdate}/>
                            <div>
                                <Checkbox field="termsAgreed" value={formData.termsAgreed} onChange={this.handleFormUpdate} renderLabel={() =>
                                    <span>I agree to the Tenderly <a className="DocumentLink" href="https://tenderly.app/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a className="DocumentLink" href="https://tenderly.app/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></span>
                                }/>
                            </div>
                            <Button onClick={this.handleRegistrationSubmit} disabled={this.isFormInvalid()}>
                                <span>Create Account</span>
                            </Button>
                        </Form>
                    </Card>
                    <div>

                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterForm;
