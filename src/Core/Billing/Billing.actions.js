import {Api} from "../../Utils/Api";
import {asyncActionWrapper} from "../../Utils/ActionHelpers";

import {SuccessActionResponse} from "../../Common";

export const FETCH_PLAN_FOR_ACCOUNT_ACTION = 'FETCH_PLAN_FOR_ACCOUNT';
export const ACTIVATE_PLAN_FOR_ACCOUNT_ACTION = 'ACTIVATE_PLAN_FOR_ACCOUNT';
export const ACTIVATE_TRIAL_FOR_ACCOUNT_ACTION = 'ACTIVATE_TRIAL_FOR_ACCOUNT';

/**
 * @param {User} account
 */
export const fetchPlanForAccount = (account) => asyncActionWrapper('fetchPlanForUser', async dispatch => {
    const {data} = Api.get(`/account/${account.username}/billing/plan`);

    console.log(data);

    dispatch({
        type: FETCH_PLAN_FOR_ACCOUNT_ACTION,
    });

    return new SuccessActionResponse();
});

/**
 * @param {User} account
 * @param {Plan} plan
 */
export const activatePlanForAccount = (account, plan) => asyncActionWrapper('activatePlanForAccount', async dispatch => {
    const {data} = Api.post(`/account/${account.username}/billing/plan/${plan.slug}`);

    console.log('plan', data);

    return new SuccessActionResponse();
});

/**
 * @param {User} account
 * @param {Plan} plan
 */
export const activateTrialForAccount = (account, plan) => asyncActionWrapper('activateTrialForAccount', async dispatch => {
    const {data} = Api.post(`/account/${account.username}/billing/plan/${plan.slug}/trial`);

    console.log('trial', data);

    return new SuccessActionResponse();
});
