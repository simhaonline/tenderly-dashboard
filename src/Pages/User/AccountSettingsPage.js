import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {FeatureFlagTypes} from "../../Common/constants";

import {getAllPlans, getUserPlan} from "../../Common/Selectors/BillingSelectors";

import {formatPrice} from "../../Utils/CurrencyHelpers";
import {initializeForm, resetForm, updateFormField} from "../../Utils/FormHelpers";

import {billingActions, authActions} from "../../Core/actions";

import {Page, Container, Panel, PanelHeader, PanelContent, PageHeading, Input, Alert, Code} from "../../Elements";
import {
    PageSegmentSwitcher,
    PageSegments,
    PageSegmentContent,
    ProgressiveButton,
    UserInformationForm,
    SubscriptionPlan
} from "../../Components";

import './AccountSettingsPage.scss';

const SettingsSegmentsTypes = {
    GENERAL: 'general',
    ORGANIZATIONS: 'organizations',
    SECURITY: 'security',
    AUTHORIZATION: 'authorization',
    BILLING: 'billing',
};

const SettingsSegments = [
    {
        label: 'General',
        value: SettingsSegmentsTypes.GENERAL,
    },
    {
        label: 'Organizations',
        value: SettingsSegmentsTypes.ORGANIZATIONS,
        featureFlag: FeatureFlagTypes.ORGANIZATIONS,
    },
    {
        label: 'Security',
        value: SettingsSegmentsTypes.SECURITY,
    },
    {
        label: 'Authorization & Tokens',
        value: SettingsSegmentsTypes.AUTHORIZATION,
    },
    {
        label: 'Billing',
        value: SettingsSegmentsTypes.BILLING,
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

    componentDidMount() {
        const {billingActions} = this.props;

        billingActions.fetchAllPlans();
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
        const {token, user, plans, userPlan} = this.props;

        let isPasswordFormValid = !!newPassword && !!repeatNewPassword;

        if (user.passwordSet && !currentPassword) {
            isPasswordFormValid = false;
        }

        return (
            <Page id="AccountSettingsPage">
                <Container>
                    <PageHeading>
                        <h1>Settings</h1>
                    </PageHeading>
                    <PageSegments>
                        <PageSegmentSwitcher current={currentSegment} options={SettingsSegments}
                                             onSelect={this.handleSegmentSwitch}/>
                        {currentSegment === SettingsSegmentsTypes.GENERAL && <PageSegmentContent>
                            <Panel>
                                <PanelHeader>
                                    <h3>Profile Information</h3>
                                </PanelHeader>
                                <PanelContent>
                                    <UserInformationForm/>
                                </PanelContent>
                            </Panel>
                        </PageSegmentContent>}
                        {currentSegment === SettingsSegmentsTypes.SECURITY && <PageSegmentContent>
                            <Panel>
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
                            </Panel>
                        </PageSegmentContent>}
                        {currentSegment === SettingsSegmentsTypes.AUTHORIZATION && <PageSegmentContent>
                            <Panel>
                                <PanelHeader>
                                    <h3>Auth Tokens</h3>
                                </PanelHeader>
                                <PanelContent>
                                    <p>You can use this token to login to our <a href="https://github.com/Tenderly/tenderly-cli" rel="noopener noreferrer" target="_blank">CLI tool.</a></p>
                                    <h4>Token</h4>
                                    <Code copy={token}>{token}</Code>
                                    <p>Or you can paste the following command into your terminal and login.</p>
                                    <Code copy={`tenderly login --authentication-method=token --token=${token}`}>tenderly login --authentication-method=token --token={token}</Code>
                                </PanelContent>
                            </Panel>
                        </PageSegmentContent>}
                        {currentSegment === SettingsSegmentsTypes.BILLING && <PageSegmentContent>
                            {!!userPlan && <SubscriptionPlan subscription={userPlan}/>}
                            <Panel>
                                <PanelContent>
                                    <div className="DisplayFlex">
                                        {plans.map(plan => <div key={plan.id} className="Flex1">
                                            <div>{plan.id}</div>
                                            <div>{formatPrice(plan.price)}</div>
                                        </div>)}
                                    </div>
                                </PanelContent>
                            </Panel>
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
        plans: getAllPlans(state),
        userPlan: getUserPlan(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(authActions, dispatch),
        billingActions: bindActionCreators(billingActions, dispatch),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccountSettingsPage);
