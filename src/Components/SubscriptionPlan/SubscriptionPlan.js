import React, {Component} from 'react';

import {UserPlanTypes} from "../../Common/constants";

import {Button, Panel, PanelContent} from "../../Elements";

import FreeImage from './free-plan.svg';
import ProImage from './pro-plan.svg';
import EnterpriseImage from './enterprise-plan.svg';

import './SubscriptionPlan.scss';
import {formatPrice} from "../../Utils/CurrencyHelpers";

class SubscriptionPlan extends Component {
    render() {
        const {subscription} = this.props;

        if (!subscription) return null;

        const plan = subscription.plan;

        return (
            <Panel className="SubscriptionPlan">
                <PanelContent className="DisplayFlex AlignItemsCenter">
                    {plan.type === UserPlanTypes.FREE && <div className="SubscriptionPlan__PlanImageWrapper">
                        <img src={FreeImage} alt="" className="SubscriptionPlan__PlanImage"/>
                    </div>}
                    {plan.type === UserPlanTypes.GRANDFATHER && <div className="SubscriptionPlan__PlanImageWrapper">
                        <img src={FreeImage} alt="" className="SubscriptionPlan__PlanImage"/>
                    </div>}
                    {plan.type === UserPlanTypes.PRO && <div className="SubscriptionPlan__PlanImageWrapper SubscriptionPlan__PlanImageWrapper--Pro">
                        <img src={ProImage} alt="" className="SubscriptionPlan__PlanImage"/>
                    </div>}
                    {plan.type === UserPlanTypes.ENTERPRISE && <div className="SubscriptionPlan__PlanImageWrapper SubscriptionPlan__PlanImageWrapper--Enterprise">
                        <img src={EnterpriseImage} alt="" className="SubscriptionPlan__PlanImage"/>
                    </div>}
                    <div>
                        {plan.type === UserPlanTypes.FREE && <div>
                            <h1>Developer Plan</h1>
                            <p>{formatPrice(plan.price)}/mo</p>
                            <p>You are currently on our free developer plan</p>
                            <div>
                                <Button>
                                    <span>Upgrade</span>
                                </Button>
                            </div>
                        </div>}
                        {plan.type === UserPlanTypes.GRANDFATHER && <div>
                            <h1>Grandfather Plan</h1>
                            <p>{formatPrice(plan.price)}/mo</p>
                            <p>You are currently on our Granfather plan.</p>
                            <div>
                                <Button>
                                    <span>Upgrade</span>
                                </Button>
                            </div>
                        </div>}
                        {plan.type === UserPlanTypes.PRO && <div>
                            <h1>Pro Plan</h1>
                            <p>{formatPrice(plan.price)}/mo</p>
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
