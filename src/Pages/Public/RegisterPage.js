import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import * as authActions from "../../Core/Auth/Auth.actions";
import MixPanel from "../../Utils/MixPanel";

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

    trackRegisteredAccountForSource = () => {
        const {source} = this.state;

        if (source) {
            MixPanel.track(`registered_from_source`, {
                source,
            });
        }
    };

    /**
     * @param {Object} data
     */
    handleRegistrationSubmit = async (data) => {
        const {actions} = this.props;

        const response = await actions.registerUser(data);

        if (response.success) {
            this.trackRegisteredAccountForSource();
        }

        return response;
    };

    /**
     * @param {string} type
     * @param {string} code
     */
    handleOAuthRegistration = async (type, code) => {
        const {actions} = this.props;

        const response = await actions.authenticateOAuth(type, code);

        if (response.success) {
            this.trackRegisteredAccountForSource();
        }
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
