import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {FeatureFlagTypes} from "../../Common/constants";
import {initializeForm, resetForm, updateFormField} from "../../Utils/FormHelpers";

import * as authActions from "../../Core/Auth/Auth.actions";

import {Page, Container, Card, CardHeading, Input, Alert, Code} from "../../Elements";
import {PageSegmentSwitcher, PageSegments, PageSegmentContent, ProgressiveButton, UserInformationForm} from "../../Components";

import './AccountSettingsPage.scss';

const SettingsSegmentsTypes = {
    GENERAL: 'general',
    SECURITY: 'security',
    BILLING: 'billing',
};

const SettingsSegments = [
    {
        label: 'General',
        value: SettingsSegmentsTypes.GENERAL,
    },
    {
        label: 'Security',
        value: SettingsSegmentsTypes.SECURITY,
    },
    {
        label: 'Billing',
        value: SettingsSegmentsTypes.BILLING,
        featureFlag: FeatureFlagTypes.BILLING,
    },
];

class AccountSettingsPage extends Component {
    constructor(props) {
        super(props);

        const tabValues = Object.values(SettingsSegmentsTypes);

        const {match: {params: {tab}}} = props;

        const currentSegment = tab && tabValues.includes(tab) ? tab : SettingsSegmentsTypes.GENERAL;

        this.state = {
            currentSegment,
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

    /**
     * @param {String} segment
     */
    handleSegmentSwitch = (segment) => {
        this.resetPasswordForm();

        this.setState({
            currentSegment: segment,
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
        const {currentSegment, error, formData: {currentPassword, newPassword, repeatNewPassword}} = this.state;
        const {token, user} = this.props;

        let isPasswordFormValid = !!newPassword && !!repeatNewPassword;

        if (user.passwordSet && !currentPassword) {
            isPasswordFormValid = false;
        }

        return (
            <Page id="AccountSettingsPage">
                <Container>
                    <PageSegments>
                        <PageSegmentSwitcher current={currentSegment} options={SettingsSegments}
                                             onSelect={this.handleSegmentSwitch}/>
                        {currentSegment === SettingsSegmentsTypes.GENERAL && <PageSegmentContent>
                            <Card>
                                <CardHeading>
                                    <h3>Profile Information</h3>
                                </CardHeading>
                                <UserInformationForm/>
                            </Card>
                        </PageSegmentContent>}
                        {currentSegment === SettingsSegmentsTypes.SECURITY && <PageSegmentContent>
                            <Card>
                                <CardHeading>
                                    <h3>Auth Tokens</h3>
                                </CardHeading>
                                <div>
                                    <p>You can use this token to login to our <a href="https://github.com/Tenderly/tenderly-cli" rel="noopener noreferrer" target="_blank">CLI tool.</a></p>
                                    <h4>Token</h4>
                                    <Code>{token}</Code>
                                    <p>Or you can paste the following command into your terminal and login.</p>
                                    <Code enableCopy>tenderly login --authentication-method=token --token={token}</Code>
                                </div>
                            </Card>
                            <Card>
                                <CardHeading>
                                    <h3>Security</h3>
                                </CardHeading>
                                <div className="ChangePasswordWrapper">
                                    <h4>Change Password</h4>
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
                                </div>
                            </Card>
                        </PageSegmentContent>}
                    </PageSegments>
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
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccountSettingsPage);
