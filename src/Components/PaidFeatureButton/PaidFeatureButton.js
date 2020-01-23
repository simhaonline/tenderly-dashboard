import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';

import {PlanUsageTypes, UserPlanTypes} from "../../Common/constants";

import {AccountPlan} from "../../Core/models";

import {Button, Dialog, DialogBody, Icon} from "../../Elements";

import "./PaidFeatureButton.scss";
import Intercom from "../../Utils/Intercom";
import {getLabelForPlanUsage} from "../../Utils/BillingHelpers";
import {getAllPlans} from "../../Common/Selectors/BillingSelectors";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {billingActions} from "../../Core/actions";

class PaidFeatureButton extends PureComponent {
    state = {
        hasRequiredPlan: true,
        upgradeModalOpen: false,
    };

    handleOnClick = (event) => {
        event.stopPropagation();
        event.preventDefault();

        this.setState({
            upgradeModalOpen: true,
        });
    };

    handleModalClose = () => {
        this.setState({
            upgradeModalOpen: false,
        });
    };

    handleTrialActivate = async () => {
        const {allPlans, billingActions} = this.props;
        const proPlan = allPlans.find(plan=> plan.type===UserPlanTypes.PRO);

        const response = await billingActions.activateTrialForAccount(proPlan);
        console.log(response)
    };

    render() {
        const {children, usage, includes, plan, dispatch, billingActions, allPlans, ...props} = this.props;
        const {upgradeModalOpen} = this.state;

        let hasAbility = false;

        if (plan && usage) {
            hasAbility = plan.usage[usage] ? !plan.usage[usage].used : false;
        } else if (plan && includes) {
            hasAbility = !!includes.split('.').reduce((data, key) => {
                if (!data || !data[key]) return false;

                return data[key];
            }, plan.plan.includes);
        }

        // @TODO @BILLING Remove when implement billing
        if (hasAbility) {
            return <Button type="button" {...props}>
                {children}
            </Button>;
        }
        const canActivateTrial = true;

        return (
            <Fragment>
                <Button {...props} onClick={this.handleOnClick}>
                    {children}
                </Button>
                <Dialog open={upgradeModalOpen} onClose={this.handleModalClose} className='PaidFeatureButton__ModalContent'>
                    <DialogBody>
                        <h2 className='PaidFeatureButton__Headline'>Tenderly Pro</h2>
                        {plan && !!usage && <div className='PaidFeatureButton__UsageInfo'>
                            <p className='PaidFeatureButton__UsageDescription'>You have exceeded the limit for your plan.</p>
                            <p className='PaidFeatureButton__UsageLabel'>{getLabelForPlanUsage(usage)}:</p>
                            <p className='PaidFeatureButton__UsageLimit'>{plan.usage[usage].count} / {plan.usage[usage].limit}</p>
                        </div>}
                        {plan && !!includes && <div>
                            <p>This is not included in your current plan</p>
                        </div>}
                        <div>
                            <h3 className='PaidFeatureButton__ProFeaturesHeadline'>Unlock with Tenderly Pro</h3>
                            <div className='PaidFeatureButton__ProFeaturesWrapper'>
                                <div className='PaidFeatureButton__ProFeaturesListItem'>
                                    <Icon className='PaidFeatureButton__ProFeaturesListIcon' icon='organization'/>Multiple Projects</div>
                                <div className='PaidFeatureButton__ProFeaturesListItem'>
                                    <Icon className='PaidFeatureButton__ProFeaturesListIcon' icon='users'/>Collaborators</div>
                                <div className='PaidFeatureButton__ProFeaturesListItem'>
                                    <Icon className='PaidFeatureButton__ProFeaturesListIcon' icon='bar-chart-2'/>Analytics</div>
                                <div className='PaidFeatureButton__ProFeaturesListItem'>
                                    <Icon className='PaidFeatureButton__ProFeaturesListIcon' icon='bell'/> Real-time Alerting</div>
                                <div className='PaidFeatureButton__ProFeaturesListItem'>
                                    <Icon className='PaidFeatureButton__ProFeaturesListIcon' icon='filter'/>Transaction Filtering</div>
                                <div className='PaidFeatureButton__ProFeaturesListItem'>
                                    <Icon className='PaidFeatureButton__ProFeaturesListIcon' icon='layers'/>Private Network Support</div>
                            </div>
                        </div>
                        {!canActivateTrial && <Button size="large" color="secondary" stretch onClick={() => Intercom.openNewConversation('Tenderly Pro upgrade info:\n')}>
                                <span className="SemiBoldText">Upgrade</span>
                            </Button>}
                        {canActivateTrial && <Button size="large" color="secondary" stretch onClick={this.handleTrialActivate}>
                            <span className="SemiBoldText">Start Free Trial</span>
                        </Button>}
                        <Button onClick={this.handleModalClose} color='secondary' outline stretch className='MarginTop2'>
                            <span>Cancel</span>
                        </Button>
                    </DialogBody>
                </Dialog>
            </Fragment>
        );
    }
}

PaidFeatureButton.propTypes = {
    usage: PropTypes.oneOf(Object.values(PlanUsageTypes)),
    includes: PropTypes.string,
    plan: PropTypes.instanceOf(AccountPlan),
};

const mapStateToProps = (state) => {
    return {
        allPlans: getAllPlans(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
      billingActions: bindActionCreators(billingActions, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PaidFeatureButton);
