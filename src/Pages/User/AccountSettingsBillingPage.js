import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';

import {formatPrice} from "../../Utils/CurrencyHelpers";

import {UserPlanTypes} from "../../Common/constants";
import {getAllPlans, getUserPlan} from "../../Common/Selectors/BillingSelectors";

import {billingActions} from "../../Core/actions";

import {Button, Dialog, DialogBody, DialogHeader, Panel, PanelContent} from "../../Elements";
import {SubscriptionPlan} from "../../Components";

class AccountSettingsBillingPage extends Component {
    state = {
        openConfirmationModal: false,
    };

    componentDidMount() {
        const {billingActions} = this.props;

        billingActions.fetchAllPlans();
    }

    /**
     * @param {boolean} value
     */
    setConfirmationModal = (value) => {
        this.setState({
            openConfirmationModal: value,
        });
    };

    handlePlanSelect = (plan) => {
        console.log(plan);

        this.setState({
            currentPlanContext: plan,
        }, () => this.setConfirmationModal(true));
    };

    handlePlanConfirmationModalClose = () => {
        this.setState({
            currentPlanContext: null,
        }, () => this.setConfirmationModal(false));
    };

    render() {
        const {userPlan, plans} = this.props;
        const {openConfirmationModal, currentPlanContext} = this.state;

        return (
            <div>
                {!!userPlan && <SubscriptionPlan subscription={userPlan}/>}
                <Panel>
                    <PanelContent>
                        <div className="DisplayFlex">
                            {plans.map(plan => <div key={plan.id} className="Flex1">
                                <div>{plan.id}</div>
                                <div>{formatPrice(plan.price)}</div>
                                {plan.type === UserPlanTypes.PRO && <Button onClick={() => this.handlePlanSelect(plan)}>
                                    <span>Try for 30 days</span>
                                </Button>}
                            </div>)}
                            <div className="Flex1">
                                <div>Enterprise</div>
                                <div>Contract us</div>
                                <div>
                                    <ul>
                                        <li>API Integration</li>
                                        <li>WebHooks</li>
                                        <li>Private Networks</li>
                                        <li>Priority Support</li>
                                    </ul>
                                </div>
                                <Button outline>
                                    <span>Get in touch</span>
                                </Button>
                            </div>
                        </div>
                    </PanelContent>
                </Panel>
                <Dialog open={openConfirmationModal} onClose={this.handlePlanConfirmationModalClose}>
                    <DialogHeader>
                        <h3>qwe</h3>
                    </DialogHeader>
                    <DialogBody>
                        {!!currentPlanContext && <div>
                            {currentPlanContext.id}
                        </div>}
                        <div>
                            <Button>
                                <span>Confirm</span>
                            </Button>
                            <Button outline>
                                <span>Cancel</span>
                            </Button>
                        </div>
                    </DialogBody>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        plans: getAllPlans(state),
        userPlan: getUserPlan(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        billingActions: bindActionCreators(billingActions, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AccountSettingsBillingPage);
