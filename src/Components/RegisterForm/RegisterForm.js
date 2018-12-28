import React, {Component} from 'react';

import {initializeForm, updateFormField} from "../../Utils/FormHelpers";

import RegisterPasswordForm from "../RegisterPasswordForm/RegisterPasswordForm";
import RegisterAccountForm from "../RegisterAccountForm/RegisterAccountForm";

import './RegisterForm.css';

class RegisterForm extends Component {
    constructor(props) {
        super(props);

        initializeForm(this, {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repeatPassword: '',
        });
        this.handleFormUpdate = updateFormField.bind(this);
    }

    render() {
        const {formData} = this.state;

        return (
            <div className="RegisterForm">
                <div>
                    <RegisterAccountForm form={formData} onChange={this.handleFormUpdate} onSubmit={() => {}}/>
                </div>
                <div>
                    <RegisterPasswordForm form={formData} onChange={this.handleFormUpdate} onSubmit={() => {}}/>
                </div>
            </div>
        )
    }
}

export default RegisterForm;
