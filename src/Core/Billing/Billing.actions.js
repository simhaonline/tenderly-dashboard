import {Api} from "../../Utils/Api";
import {asyncActionWrapper} from "../../Utils/ActionHelpers";

import {ErrorActionResponse, SuccessActionResponse} from "../../Common";
import Plan from "./Plan.model";
import AccountPlan from "./AccountPlan.model";

export const FETCH_PLAN_FOR_ACCOUNT_ACTION = 'FETCH_PLAN_FOR_ACCOUNT';
export const ACTIVATE_PLAN_FOR_ACCOUNT_ACTION = 'ACTIVATE_PLAN_FOR_ACCOUNT';
export const ACTIVATE_TRIAL_FOR_ACCOUNT_ACTION = 'ACTIVATE_TRIAL_FOR_ACCOUNT';
export const FETCH_ALL_PLANS_ACTION = 'FETCH_ALL_PLANS';

/**
 * @param {string} username
 */
export const fetchPlanForAccount = (username) => asyncActionWrapper({
    name: 'fetchPlanForUser',
}, async dispatch => {
    const {data} = await Api.get(`/account/${username}/billing/plan`);

    if (!data || !data.plan) {
        return new ErrorActionResponse();
    }

    const accountPlan = AccountPlan.buildFromResponse(data.plan, data.usage);

    dispatch({
        type: FETCH_PLAN_FOR_ACCOUNT_ACTION,
        username,
        accountPlan,
    });

    return new SuccessActionResponse(accountPlan);
});

/**
 * @param {User} account
 * @param {AccountPlan} plan
 */
export const activatePlanForAccount = (account, plan) => asyncActionWrapper({
    name: 'activatePlanForAccount',
}, async dispatch => {
    const {data} = await Api.post(`/account/${account.username}/billing/plan/${plan.plan.id}`);

    if(!data || !data.plan) {
        return new ErrorActionResponse();
    }

    const accountPlan = AccountPlan.buildFromResponse(data.plan, data.usage);

    dispatch({
        type: ACTIVATE_PLAN_FOR_ACCOUNT_ACTION,
        accountPlan,
        username: account.username,
        trialUsed: data.trial_used,
    });

    return new SuccessActionResponse();
});

/**
 * @param {User} account
 * @param {Plan} plan
 */
export const activateTrialForAccount = (account, plan) => asyncActionWrapper({
    name: 'activateTrialForAccount',
}, async dispatch => {
    const {data} = await Api.post(`/account/${account.username}/billing/plan/${plan.id}/trial`);

    if(!data || !data.plan) {
        return new ErrorActionResponse();
    }

    const accountPlan = AccountPlan.buildFromResponse(data.plan, data.usage);

    dispatch({
        type: ACTIVATE_TRIAL_FOR_ACCOUNT_ACTION,
        accountPlan,
        username: account.username,
        trialUsed: true,
    });

    return new SuccessActionResponse();
});

export const fetchAllPlans = () =>  asyncActionWrapper({
    name: 'fetchAllPlans',
}, async dispatch => {
    const {data} = await Api.get(`/billing/all-plans`);

    if (!data || !data.plans) {
        return new ErrorActionResponse();
    }

    const plans = data.plans.map(plan => Plan.buildFromResponse(plan));

    dispatch({
        type: FETCH_ALL_PLANS_ACTION,
        plans,
    });

    return new SuccessActionResponse(plans);
});