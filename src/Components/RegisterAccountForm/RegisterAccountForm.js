import React from 'react';

import {Button, Card, Form, Icon, Input} from "../../Elements";

import './RegisterAccountForm.css';

const RegisterAccountForm = ({form, onChange, onSubmit}) => {
    return (
        <Card className="RegisterAccountForm">
            <Form>
                <Input/>
                <Input/>
                <Input/>
                <Button onClick={onSubmit}>
                    <span>Next</span>
                    <Icon icon="arrow-right"/>
                </Button>
            </Form>
        </Card>
    )
};

export default RegisterAccountForm;
