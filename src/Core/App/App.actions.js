import {ActionResponse} from "../../Common";
import {Api} from "../../Utils/Api";

export const SET_WHOLE_SCREEN_PAGE_ACTION = 'SET_WHOLE_SCREEN_PAGE';

/**
 * @param {boolean} value
 */
export const setWholeScreenPage = (value) => {
    return dispatch => {
        dispatch({
            type: SET_WHOLE_SCREEN_PAGE_ACTION,
            value,
        });
    }
};

/**
 * @param {User} user
 * @param {string} message
 */
export const sendFeedback = (user, message) => {
    return async dispatch => {
        try {
            await Api.post('/support/feedback', {
                subject: `Feedback from ${user.username}`,
                body: message,
            });

            return new ActionResponse(true);
        } catch (error) {
            return new ActionResponse(false, error)
        }
    }
};

/**
 * @param {User} user
 * @param {string} message
 */
export const sendSupportTicket = (user, message) => {
    return async dispatch => {
        try {
            await Api.post('/support/ticket', {
                subject: `Support Ticket from ${user.username}`,
                body: message,
            });

            return new ActionResponse(true);
        } catch (error) {
            return new ActionResponse(false, error)
        }
    }
};
