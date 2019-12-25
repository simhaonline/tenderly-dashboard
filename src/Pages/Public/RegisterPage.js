import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import * as authActions from "../../Core/Auth/Auth.actions";

import {Container, Page} from "../../Elements";
import {RegisterForm} from "../../Components";
import LocalStorage from "../../Utils/LocalStorage";
import {LocalStorageKeys} from "../../Common/constants";

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        const {location} = props;

        let redirectToState;
        let loginFlow;

        if (LocalStorage.getItem(LocalStorageKeys.LOGIN_REDIRECT)) {
            redirectToState = LocalStorage.getItem(LocalStorageKeys.LOGIN_REDIRECT);

            LocalStorage.removeItem(LocalStorageKeys.LOGIN_REDIRECT);
        }

        if (LocalStorage.getItem(LocalStorageKeys.LOGIN_FLOW)) {
            loginFlow = LocalStorage.getItem(LocalStorageKeys.LOGIN_FLOW);

            LocalStorage.removeItem(LocalStorageKeys.LOGIN_FLOW);
        }

        if (location.state && location.state.from) {
            redirectToState = location.state.from;
        }

        if (location.state && location.state.flow) {
            loginFlow = location.state.flow;
        }

        this.state = {
            registered: false,
            source: null,
            flow: loginFlow,
            redirectToState,
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
        const {redirectToState} = this.state;

        if (auth.loggedIn) {
            if (redirectToState) {
                return <Redirect to={redirectToState}/>;
            }

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
