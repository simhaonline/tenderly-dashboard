import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as authActions from "../../Core/Auth/Auth.actions";

import {Page, Container} from "../../Elements";
import {RegisterForm} from "../../Components";

class RegisterPage extends Component {

    render() {
        return (
            <Page padding={false} wholeScreenPage>
                <Container>
                    <RegisterForm/>
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
