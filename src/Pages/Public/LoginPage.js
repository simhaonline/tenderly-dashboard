import React, {Component} from 'react';
import {connect} from "react-redux";

import {Page, Container, Button, Form, Input} from "../../Elements";

class LoginPage extends Component {
    render() {
        const {auth} = this.props;

        console.log(auth);

        return (
            <Page id="LoginPage">
                <Container>
                    <div className="LoginFormWrapper">
                        <Form>
                            <Input label="E-mail" field="email" value={"test"}/>
                            <Input label="E-mail" field="email"/>
                        </Form>
                        <Button>Login</Button>
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
