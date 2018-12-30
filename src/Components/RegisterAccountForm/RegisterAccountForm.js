import React from 'react';

import {Button, Card, Form, Icon, Input} from "../../Elements";

import './RegisterAccountForm.css';

const RegisterAccountForm = ({form, onChange, onSubmit}) => {
    return (
        <Card className="RegisterAccountForm">
            <Form onSubmit={onSubmit}>
                <div className="NameInputWrapper">
                    <div className="NameInputColumn">
                        <Input field="firstName" onChange={onChange} value={form.firstName} label="First name" icon="user"/>
                    </div>
                    <div className="NameInputColumn">
                        <Input field="lastName" onChange={onChange} value={form.lastName} label="Last name" icon="user"/>
                    </div>
                </div>
                <Input field="email" onChange={onChange} value={form.email} label="E-mail" icon="mail"/>
                <Button onClick={onSubmit}>
                    <span>Next</span>
                    <Icon icon="arrow-right"/>
                </Button>
            </Form>
        </Card>
    )
};

export default RegisterAccountForm;
