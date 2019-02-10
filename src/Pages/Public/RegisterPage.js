import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as authActions from "../../Core/Auth/Auth.actions";

import {Page, Container} from "../../Elements";
import {RegisterForm} from "../../Components";

class RegisterPage extends Component {
    /**
     * @param {Object} data
     */
    handleRegistrationSubmit = (data) => {
        console.log('register', data);
    };

    /**
     * @param {string} type
     * @param {string} code
     */
    handleOAuthRegistration = async (type, code) => {
        const {actions} = this.props;

        await actions.authenticateOAuth(type, code);
    };

    render() {
        return (
            <Page padding={false} wholeScreenPage>
                <Container>
                    <RegisterForm onSubmit={this.handleRegistrationSubmit}
                                  onOAuth={this.handleOAuthRegistration}/>
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
