import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as authActions from "../../Core/Auth/Auth.actions";

import {Page, Container} from "../../Elements";
import {RegisterForm} from "../../Components";
import {Redirect} from "react-router-dom";

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            registered: false,
        }
    }

    /**
     * @param {Object} data
     */
    handleRegistrationSubmit = async (data) => {
        const {actions} = this.props;

        const response = await actions.registerUser(data);

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
        const {auth} = this.props;

        if (auth.loggedIn) {
            return <Redirect to="/dashboard"/>;
        }

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
