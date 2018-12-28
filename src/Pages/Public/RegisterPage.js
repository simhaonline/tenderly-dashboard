import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as authActions from "../../Core/Auth/Auth.actions";
import {initializeForm, updateFormField} from "../../Utils/FormHelpers";

import {Page, Container, Card, Form, Input, Button, Icon} from "../../Elements";
import {RegisterPasswordForm} from "../../Components";

class RegisterPage extends Component {
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
        const {formData: {firstName, lastName, email}, formData} = this.state;
        return (
            <Page padding={false} wholeScreenPage>
                <Container>
                    Register page
                    <div>
                        <Card>
                            <Form>
                                <Input/>
                                <Input/>
                                <Input/>
                                <Button>
                                    <span>Next</span>
                                    <Icon icon="arrow-right"/>
                                </Button>
                            </Form>
                        </Card>
                    </div>
                    <div>
                        <RegisterPasswordForm form={formData} onChange={this.handleFormUpdate} onSubmit={() => {}}/>
                        <p><a href="https://xkcd.com/936/" target="_blank">https://xkcd.com/936/</a></p>
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
)(RegisterPage);
