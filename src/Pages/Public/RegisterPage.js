import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import * as authActions from "../../Core/Auth/Auth.actions";

import {Container, Page} from "../../Elements";
import {RegisterForm} from "../../Components";

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            registered: false,
            source: null,
        }
    }

    componentDidMount() {
        const {location: {search}} = this.props;

        const searchParams = new URLSearchParams(search);

        const source = searchParams.get('source');

        if (source) {
            this.setState({
                source,
            });
        }
    }

    /**
     * @param {Object} data
     */
    handleRegistrationSubmit = async (data) => {
        const {actions} = this.props;

        return await actions.registerUser(data);
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
            <Page padding={false}>
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
