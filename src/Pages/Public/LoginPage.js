import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {initializeForm, updateFormField} from "../../Utils/FormHelpers";
import * as authActions from "../../Core/Auth/Auth.actions";

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

    handleFormSubmit = () => {
        const {formData: {email, password}} = this.state;


        if (!email || !password) {
            return;
        }

        const {actions} = this.props;

        actions.loginUser(email, password);
    };

    render() {
        const {formData} = this.state;

        return (
            <Page id="LoginPage">
                <Container>
                    <div className="LoginFormWrapper">
                        <Form onSubmit={this.handleFormSubmit}>
                            <Input label="E-mail" field="email" value={formData.email} onChange={this.handleFormUpdate}/>
                            <Input type="password" label="Password" field="password" value={formData.password} onChange={this.handleFormUpdate}/>
                            <Button type="submit">Login</Button>
                        </Form>
                    </div>
                    <div className="SignUpWrapper">
                        <h2>Want to participate in our Early Access Program?</h2>
                        <p>We are currently working hard on creating the right tools to help and speed up Smart Contract development.</p>
                        <p>For that we need your help! You can help by participating in our early access program and by providing feedback on newly released features.</p>
                        <p>You can see a full list of <a href="https://tenderly.app#features">our features here</a>.</p>
                        <Button>Sign up for Early Access</Button>
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

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(authActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginPage);
