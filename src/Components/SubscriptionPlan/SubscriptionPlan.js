import React, {Component} from 'react';

import {UserPlanTypes} from "../../Common/constants";

import {Button, Panel, PanelContent} from "../../Elements";

import FreeImage from './free-plan.svg';
import ProImage from './pro-plan.svg';
import EnterpriseImage from './enterprise-plan.svg';

import './SubscriptionPlan.scss';

class SubscriptionPlan extends Component {
    render() {
        const {plan} = this.props;

        return (
            <Panel className="SubscriptionPlan">
                <PanelContent className="DisplayFlex AlignItemsCenter">
                    {plan === UserPlanTypes.FREE && <div className="SubscriptionPlan__PlanImageWrapper">
                        <img src={FreeImage} alt="" className="SubscriptionPlan__PlanImage"/>
                    </div>}
                    {[UserPlanTypes.PRO, UserPlanTypes.PRO_TRIAL].includes(plan) && <div className="SubscriptionPlan__PlanImageWrapper SubscriptionPlan__PlanImageWrapper--Pro">
                        <img src={ProImage} alt="" className="SubscriptionPlan__PlanImage"/>
                    </div>}
                    {[UserPlanTypes.ENTERPRISE, UserPlanTypes.ENTERPRISE_TRIAL].includes(plan) && <div className="SubscriptionPlan__PlanImageWrapper SubscriptionPlan__PlanImageWrapper--Enterprise">
                        <img src={EnterpriseImage} alt="" className="SubscriptionPlan__PlanImage"/>
                    </div>}
                    <div>
                        {plan === UserPlanTypes.FREE && <div>
                            <h1>Developer Plan</h1>
                            <p>$0/mo</p>
                            <p>You are currently on our free developer plan</p>
                            <div>
                                <Button>
                                    <span>Upgrade</span>
                                </Button>
                            </div>
                        </div>}
                        {plan === UserPlanTypes.PRO && <div>
                            <h1>Pro Plan</h1>
                            <p>$500/mo</p>
                            <p>You are currently on our free developer plan</p>
                            <Button>
                                <span>Upgrade</span>
                            </Button>
                        </div>}
                    </div>
                </PanelContent>
            </Panel>
        );
    }
}

export default SubscriptionPlan;
