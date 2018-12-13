import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {FeatureFlagTypes} from "../../Common/constants";
import {initializeForm, resetForm, updateFormField} from "../../Utils/FormHelpers";

import * as authActions from "../../Core/Auth/Auth.actions";

import {Page, Container, Card, CardHeading, Input, Alert} from "../../Elements";
import {PageSegmentSwitcher, ProgressiveButton} from "../../Components";

import './AccountSettingsPage.css';

const SettingsSegments = [
    {
        label: 'General',
        value: 'general',
    },
    {
        label: 'Security',
        value: 'security',
    },
    {
        label: 'Billing',
        value: 'billing',
        featureFlag: FeatureFlagTypes.BILLING,
    },
];

class AccountSettingsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSegment: 'general',
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
        const {actions} = this.props;

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

        const actionResponse = await actions.changePassword(currentPassword, newPassword);

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
        const {user} = this.props;

        const isPasswordFormValid = !!currentPassword && !!newPassword && !!newPassword;

        return (
            <Page id="AccountSettingsPage">
                <Container className="SettingsContainer">
                    <div className="SettingsSwitcherWrapper">
                        <PageSegmentSwitcher current={currentSegment} options={SettingsSegments}
                                             onSelect={this.handleSegmentSwitch}/>
                    </div>
                    {currentSegment === 'general' && <div className="SettingsSegmentContent">
                        <Card>
                            <CardHeading>
                                <h3>General</h3>
                            </CardHeading>
                            <div>{user.firstName} {user.lastName}</div>
                            {user.username}
                        </Card>
                    </div>}
                    {currentSegment === 'security' && <div className="SettingsSegmentContent">
                        <Card>
                            <CardHeading>
                                <h3>Security</h3>
                            </CardHeading>
                            <div className="ChangePasswordWrapper">
                                <h4>Change Password</h4>
                                <Input icon="lock" type="password" field="currentPassword" value={currentPassword}
                                       label="Current Password" onChange={this.handleFormUpdate}/>
                                <hr/>
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
                    </div>}
                </Container>
            </Page>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
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
