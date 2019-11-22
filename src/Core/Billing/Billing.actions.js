import {Api} from "../../Utils/Api";
import {asyncActionWrapper} from "../../Utils/ActionHelpers";

import {SuccessActionResponse} from "../../Common";

export const FETCH_PLAN_FOR_ACCOUNT_ACTION = 'FETCH_PLAN_FOR_ACCOUNT';

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
