import {asyncActionWrapper} from "../../Utils/ActionHelpers";
import {SuccessActionResponse} from "../../Common";

/**
 * @param {User} user
 */
export const fetchPlanForUser = (user) => asyncActionWrapper('fetchPlanForUser', async dispatch => {
    return new SuccessActionResponse();
});
