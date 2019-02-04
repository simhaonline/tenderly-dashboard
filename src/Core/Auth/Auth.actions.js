import Cookies from "js-cookie";
import * as Sentry from "@sentry/browser";

import {PublicApi, Api} from '../../Utils/Api';
import MixPanel from "../../Utils/MixPanel";

import User from "./User.model";
import {ActionResponse} from "../../Common";

export const LOG_IN_ACTION = 'LOG_IN';
export const LOG_OUT_ACTION = 'LOG_OUT';
export const REGISTER_ACTION = 'REGISTER';
export const GET_USER_ACTION = 'GET_USER';
export const COMPLETE_ONBOARDING = 'COMPLETE_ONBOARDING';
export const RETRIEVE_TOKEN_ACTION = 'RETRIEVE_TOKEN';

/**
 * @param {string} token
 */
const setAuthHeader = (token) => {
    return async dispatch => {
        Cookies.set('token', token, { path: '/', expires: 30 });
        Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
};

const removeAuthHeader = () => {
    return async dispatch => {
        Cookies.remove('token');
        Api.defaults.headers.common['Authorization'] = null;
    }
};

/**
 * @param {string} username
 * @param {string} password
 * @returns {ActionResponse}
 */
export const loginUser = (username, password) => {
    return async dispatch => {
        try {
            const {data} = await PublicApi.post(`/login`, {
                username,
                password,
            });

            if (!data) {
                return;
            }

            dispatch({
                type: LOG_IN_ACTION,
                token: data.token,
            });
            dispatch(setAuthHeader(data.token));
            dispatch(getUser());

            MixPanel.track('Logged into dashboard');

            return new ActionResponse(true, data.token);
        } catch (error) {
            return new ActionResponse(false, error.response.data);
        }
    }
};

export const logoutUser = () => {
    return async dispatch => {
        dispatch({
            type: LOG_OUT_ACTION,
        });
        dispatch(removeAuthHeader());
    }
};

export const getUser = () => {
    return async dispatch => {
        const {data} = await Api.get('/user');

        if (!data.user) {
            return;
        }

        const user = new User(data.user);

        MixPanel.setUser(user);

        Sentry.configureScope(scope => {
            scope.setUser({
                id: user.id,
                email: user.email,
            });
        });

        dispatch({
            type: GET_USER_ACTION,
            user,
        });
    }
};

/**
 * @param {String} oldPassword
 * @param {String} newPassword
 * @returns {Function}
 */
export const changePassword = (oldPassword, newPassword) => {
    return async dispatch => {
        try {
            const {data} = await Api.post('/user/change-password', {
                "old_password": oldPassword,
                "new_password": newPassword,
            });

            return new ActionResponse(data.ok);
        } catch (error) {
            return new ActionResponse(false, error.response.data);
        }
    }
};

export const completeOnboarding = () => {
    return async dispatch => {
        dispatch({
            type: COMPLETE_ONBOARDING,
        });
    }
};

/**
 * @param {string} token
 */
export const retrieveToken = (token) => {
    return async dispatch => {
        if (token) {
            dispatch(setAuthHeader(token));
            await dispatch(getUser());
        }

        dispatch({
            type: RETRIEVE_TOKEN_ACTION,
            token,
        });
    }
};

/**
 * @param {string} service
 * @param {string} code
 */
export const authenticateOAuth = (service, code) => {
    return async dispatch => {
        try {
            const {data} = await PublicApi.post(`/oauth`, {
                type: service,
                code,
            });

            if (!data) {
                return;
            }

            dispatch({
                type: LOG_IN_ACTION,
                token: data.token,
            });
            dispatch(setAuthHeader(data.token));
            await dispatch(getUser());

            MixPanel.track('Authenticated to Dashboard via OAuth', {
                service,
            });

            return new ActionResponse(true, data.token);
        } catch (error) {
            return new ActionResponse(false, error.response.data);
        }
    }
};
