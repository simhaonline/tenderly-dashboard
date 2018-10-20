import React, {Component} from 'react';
import {connect} from "react-redux";

import {initializeForm, updateFormField} from "../../Utils/FormHelpers";

import {Page, Container, Button, Form, Input} from "../../Elements";

class LoginPage extends Component {
    constructor(props) {
        super(props);

        initializeForm(this, {
            email: '',
            password: '',
        });
        this.handleFormUpdate = updateFormField.bind(this);
    }

    handleFormSubmit = (event) => {
        const {formData} = this.state;

        console.log(formData, event);
    };

    render() {
        const {formData} = this.state;

        return (
            <Page id="LoginPage">
                <Container>
                    <div className="LoginFormWrapper">
                        <Form onSubmit={this.handleFormSubmit}>
                            <Input label="E-mail" field="email" value={formData.email} onChange={this.handleFormUpdate}/>
                            <Input label="Password" field="password" value={formData.password} onChange={this.handleFormUpdate}/>
                            <Button type="submit">Login</Button>
                        </Form>
                    </div>
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(
    mapStateToProps,
    null,
)(LoginPage);
