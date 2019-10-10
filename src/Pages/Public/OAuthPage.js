import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Redirect} from "react-router-dom";

import {LocalStorageKeys, OAuthServiceTypeMap, OAuthStatusMap} from "../../Common/constants";

import LocalStorage from "../../Utils/LocalStorage";

import * as authActions from "../../Core/Auth/Auth.actions";
import * as notificationActions from "../../Core/Notification/Notification.actions";

import {Page, Container} from "../../Elements";
import OAuthStatus from "../../Components/OAuthStatus/OAuthStatus";

class OAuthPage extends Component {
    constructor(props) {
        super(props);

        let redirectTo = props.redirectTo;

        if (LocalStorage.getItem(LocalStorageKeys.LOGIN_REDIRECT)) {
            redirectTo = LocalStorage.getItem(LocalStorageKeys.LOGIN_REDIRECT);

            LocalStorage.removeItem(LocalStorageKeys.LOGIN_REDIRECT);
            LocalStorage.removeItem(LocalStorageKeys.LOGIN_FLOW);
        }

        this.state = {
            alreadyLoggedIn: false,
            authenticating: false,
            redirectTo,
        };
    }


    async componentDidMount() {
        const {service, code, actions, notificationActions, auth, redirectTo} = this.props;

        if (!service || !code) {
            return;
        }

        this.setState({
            authenticating: true,
        });

        let response;

        switch (service) {
            case OAuthServiceTypeMap.GITHUB:
                if (auth.loggedIn) {
                    this.setState({
                        alreadyLoggedIn: true,
                    });

                    return;
                }

                response = await actions.authenticateOAuth(service, code);

                break;
            case OAuthServiceTypeMap.SLACK:
                response = await notificationActions.connectSlackChannel(code, redirectTo);

                break;
            default:
                break;
        }

        setTimeout(() => {
            this.setState({
                authenticating: false,
                authResponse: response,
            });

        }, 1500);
    }

    render() {
        const {authenticating, redirectTo, authResponse, alreadyLoggedIn} = this.state;
        const {service, auth: {loggedIn}} = this.props;

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
            const redirectRoute = redirectTo || "/dashboard";
            return <Redirect to={redirectRoute}/>;
        }

        return (
            <Page wholeScreenPage>
                <Container>
                    <OAuthStatus service={service} loggedIn={loggedIn} redirectTo={redirectTo} status={currentStatus}/>
                </Container>
            </Page>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {match: {params: {service}}, location: {search}} = ownProps;

    const searchParams = new URLSearchParams(search);

    const authCode = searchParams.get("code") || null;

    const redirectTo = searchParams.get("redirectTo") || null;

    return {
        service,
        code: authCode,
        redirectTo,
        auth: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(authActions, dispatch),
        notificationActions: bindActionCreators(notificationActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OAuthPage);
