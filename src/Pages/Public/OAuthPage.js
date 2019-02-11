import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Redirect} from "react-router-dom";

import {OAuthStatusMap} from "../../Common/constants";

import {Page, Container} from "../../Elements";
import OAuthStatus from "../../Components/OAuthStatus/OAuthStatus";

import * as authActions from "../../Core/Auth/Auth.actions";

class OAuthPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alreadyLoggedIn: false,
            authenticating: false,
        };
    }


    async componentDidMount() {
        const {service, code, actions, auth} = this.props;

        if (auth.loggedIn) {
            this.setState({
                alreadyLoggedIn: true,
            });

            return;
        }

        if (service && code) {
            this.setState({
                authenticating: true,
            });

            const response = await actions.authenticateOAuth(service, code);

            setTimeout(() => {
                this.setState({
                    authenticating: false,
                    authResponse: response,
                });

            }, 1500);
        }
    }

    render() {
        const {authenticating, authResponse, alreadyLoggedIn} = this.state;
        const {service, auth} = this.props;

        if (alreadyLoggedIn) {
            return <Redirect to="/"/>;
        }

        let currentStatus;

        if (authenticating) {
            currentStatus = OAuthStatusMap.AUTHENTICATING;
        } else if (authResponse && !authResponse.success) {
            currentStatus = OAuthStatusMap.FAILED;
        } else if (authResponse && authResponse.success) {
            currentStatus = OAuthStatusMap.SUCCESS;
        }

        if (currentStatus === OAuthStatusMap.SUCCESS) {
            return <Redirect to="/dashboard"/>;
        }

        return (
            <Page wholeScreenPage>
                <Container>
                    <OAuthStatus service={service} status={currentStatus}/>
                </Container>
            </Page>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {service}}, location: {search}} = ownProps;

    const searchParams = new URLSearchParams(search);

    const authCode = searchParams.get("code") || null;

    return {
        service,
        code: authCode,
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
)(OAuthPage);
