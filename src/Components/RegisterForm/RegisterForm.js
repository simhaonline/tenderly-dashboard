import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import classNames from 'classnames';

import {initializeForm, updateFormField} from "../../Utils/FormHelpers";

import RegisterPasswordForm from "../RegisterPasswordForm/RegisterPasswordForm";
import RegisterAccountForm from "../RegisterAccountForm/RegisterAccountForm";

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
            registered: false,
            password: '',
            repeatPassword: '',
        });
        this.handleFormUpdate = updateFormField.bind(this);
    }

    handleSubmitAccountInfo = () => {
        this.setState({
            currentStep: 'password',
        });
    };

    handlePasswordBackup = () => {
        this.setState({
            currentStep: 'account',
        });
    };

    handleSubmitPasswordInfo = () => {
        this.setState({
            registered: true,
        });
    };

    render() {
        const {formData, currentStep, registered} = this.state;

        if (registered) {
            return <Redirect to={'/dashboard'}/>
        }

        return (
            <div className="RegisterForm">
                <div className="FormStepsWrapper">
                    <div className={classNames(
                        "FormStep",
                        {
                            "Active": currentStep === 'account',
                            "Previous": currentStep === 'password',
                        },
                    )}>
                        <RegisterAccountForm form={formData} onChange={this.handleFormUpdate} onSubmit={this.handleSubmitAccountInfo}/>
                    </div>
                    <div className={classNames(
                        "FormStep",
                        {
                            "Active": currentStep === 'password',
                        },
                    )}>
                        <RegisterPasswordForm form={formData}
                                              onChange={this.handleFormUpdate}
                                              onBack={this.handlePasswordBackup}
                                              onSubmit={this.handleSubmitPasswordInfo}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterForm;
