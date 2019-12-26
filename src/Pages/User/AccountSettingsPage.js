import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Route, Switch} from "react-router-dom";

import {initializeForm, resetForm, updateFormField} from "../../Utils/FormHelpers";

import {authActions} from "../../Core/actions";

import {Page, Container, Panel, PanelHeader, PanelContent, PageHeading, Input, Alert, Code} from "../../Elements";
import {
    ProgressiveButton,
    UserInformationForm,
} from "../../Components";
import AccountSettingsBillingPage from "./AccountSettingsBillingPage";

import './AccountSettingsPage.scss';

const SettingsPageTabs = [
    {
        route: '/account',
        label: 'General',
    },
    {
        route: '/account/security',
        label: 'Security',
    },
    {
        route: '/account/authorization',
        label: 'Authorization',
    },
];


class AccountSettingsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
        };

        initializeForm(this, {
            currentPassword: '',
            newPassword: '',
            repeatNewPassword: '',
        });
        this.handleFormUpdate = updateFormField.bind(this);
    }

    resetPasswordForm = () => {
        resetForm(this, {
            currentPassword: '',
            newPassword: '',
            repeatNewPassword: '',
        });

        this.setState({
            error: null,
        });
    };

    handleChangePasswordSubmit = async () => {
        const {formData: {currentPassword, newPassword, repeatNewPassword}} = this.state;
        const {actions, user} = this.props;

        if (newPassword !== repeatNewPassword) {
            this.setState({
                error: {
                    message: 'New passwords do not match. Make sure you have entered the correct passwords.'
                }
            });

            return false;
        }

        this.setState({
            error: null,
        });

        let actionResponse;

        if (user.passwordSet) {
            actionResponse = await actions.changePassword(currentPassword, newPassword);
        } else {
            actionResponse = await actions.setPassword(newPassword);
        }

        if (!actionResponse.success && actionResponse.data.error) {
            this.setState({
                error: {
                    message: actionResponse.data.error.message,
                }
            });
        }

        if (actionResponse.success) {
            this.resetPasswordForm();
        }

        return actionResponse.success;
    };

    render() {
        const {error, formData: {currentPassword, newPassword, repeatNewPassword}} = this.state;
        const {token, user} = this.props;

        let isPasswordFormValid = !!newPassword && !!repeatNewPassword;

        if (user.passwordSet && !currentPassword) {
            isPasswordFormValid = false;
        }

        return (
            <Page id="AccountSettingsPage" tabs={SettingsPageTabs}>
                <Container>
                    <PageHeading>
                        <h1>Settings</h1>
                    </PageHeading>
                    <Switch>
                        <Route path="/account" exact render={() => <Panel>
                            <PanelHeader>
                                <h3>Profile Information</h3>
                            </PanelHeader>
                            <PanelContent>
                                <UserInformationForm/>
                            </PanelContent>
                        </Panel>}/>
                        <Route path="/account/security" exact render={() => <Panel>
                            <PanelHeader>
                                <h3>Security</h3>
                            </PanelHeader>
                            <PanelContent className="ChangePasswordWrapper">
                                <h4>
                                    {user.passwordSet && <span>Change Password</span>}
                                    {!user.passwordSet && <span>Set Password</span>}
                                </h4>
                                {user.passwordSet && <Fragment>
                                    <Input icon="lock" type="password" field="currentPassword" value={currentPassword}
                                           label="Current Password" onChange={this.handleFormUpdate}/>
                                    <hr/>
                                </Fragment>}
                                <Input icon="lock" type="password" field="newPassword" value={newPassword}
                                       label="New Password" onChange={this.handleFormUpdate}/>
                                <Input icon="lock" type="password" field="repeatNewPassword" value={repeatNewPassword}
                                       label="Repeat New Password" onChange={this.handleFormUpdate}/>
                                {error && <Alert color="danger" animation={true}>{error.message}</Alert>}
                                <ProgressiveButton size="small" outline label="Change Password"
                                                   progressLabel="Updating..." finishedLabel="Password Updated"
                                                   color="primary" disabled={!isPasswordFormValid}
                                                   onClick={this.handleChangePasswordSubmit}/>
                            </PanelContent>
                        </Panel>}/>
                        <Route path="/account/authorization" exact render={() => <Panel>
                            <PanelHeader>
                                <h3>Auth Tokens</h3>
                            </PanelHeader>
                            <PanelContent>
                                <p>You can use this token to login to our <a href="https://github.com/Tenderly/tenderly-cli" rel="noopener noreferrer" target="_blank">CLI tool.</a></p>
                                <h4>Token</h4>
                                <Code copy={token}>{token}</Code>
                                <p className="MarginTop2">Or you can paste the following command into your terminal and login.</p>
                                <Code copy={`tenderly login --authentication-method=token --token=${token}`}>tenderly login --authentication-method=token --token={token}</Code>
                            </PanelContent>
                        </Panel>}/>
                        <Route path="/account/billing" exact component={AccountSettingsBillingPage}/>
                    </Switch>
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        token: state.auth.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(authActions, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccountSettingsPage);
