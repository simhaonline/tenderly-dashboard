import Cookies from "js-cookie";
import * as Sentry from "@sentry/browser";

import {PublicApi, Api} from '../../Utils/Api';
import MixPanel from "../../Utils/MixPanel";
import FullStory from "../../Utils/FullStory";

import User from "./User.model";
import {ErrorActionResponse, SuccessActionResponse, ActionResponse} from "../../Common";
import {UsernameStatusMap} from "../../Common/constants";

export const LOG_IN_ACTION = 'LOG_IN';
export const LOG_OUT_ACTION = 'LOG_OUT';
export const REGISTER_ACTION = 'REGISTER';
export const GET_USER_ACTION = 'GET_USER';
export const COMPLETE_ONBOARDING = 'COMPLETE_ONBOARDING';
export const RETRIEVE_TOKEN_ACTION = 'RETRIEVE_TOKEN';
export const SET_USERNAME_ACTION = 'SET_USERNAME';

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
                email: username,
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

            MixPanel.track('authenticated_login');

            return new ActionResponse(true, data.token);
        } catch (error) {
            return new ActionResponse(false, error.response.data);
        }
    }
};

/**
 * @param {Object} userData
 * @return {Function}
 */
export const registerUser = (userData) => {
    return async dispatch => {
        try {
            const {data} = await PublicApi.post('/register', {
                first_name: userData.firstName,
                last_name: userData.lastName,
                username: userData.username,
                email: userData.email,
                password: userData.password,
            });

            if (!data) {
                return new ErrorActionResponse();
            }

            dispatch({
                type: REGISTER_ACTION,
                token: data.token,
            });
            dispatch(setAuthHeader(data.token));
            dispatch(getUser());

            MixPanel.track('registered_new_account');
            MixPanel.track('registered_via_sign_up');

            return new ActionResponse(true, data.token);
        } catch (error) {
            return new ErrorActionResponse(error);
        }
    };
};

export const logoutUser = () => {
    return async dispatch => {
        dispatch({
            type: LOG_OUT_ACTION,
        });
        dispatch(removeAuthHeader());
    }
};

/**
 * @returns {ActionResponse}
 */
export const getUser = () => {
    return async dispatch => {
        try {
            const {data} = await Api.get('/user');

            if (!data.user) {
                return;
            }

            const user = new User(data.user);

            MixPanel.setUser(user);
            FullStory.identifyUser(user);

            Sentry.configureScope(scope => {
                scope.setUser({
                    id: user.id,
                    email: user.email,
                });
            });

            dispatch({
                type: GET_USER_ACTION,
                user,
                passwordSet: data.user.password_is_set,
            });

            return new SuccessActionResponse(user);
        } catch (error) {
            return new ErrorActionResponse(error);
        }
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

/**
 * @param {string} email
 * @return {Function}
 */
export const recoverAccount = (email) => {
    return async dispatch => {
        try {
            if (!email) {
                return new ErrorActionResponse('Invalid e-mail address.');
            }

            const {data} = await PublicApi.post('/reset-password', {
                email,
            });

            return new SuccessActionResponse(data);
        } catch (error) {
            return new ErrorActionResponse(error);
        }
    }
};

/**
 * @param code
 * @param newPassword
 * @return {Function}
 */
export const resetPassword = (code, newPassword) => {
    return async dispatch => {
        try {
            const {data} = await PublicApi.post('/reset-password-set', {
                code,
                new_password: newPassword,
            });

            if (!data) {
                return new ErrorActionResponse();
            }

            return new SuccessActionResponse();
        } catch (error) {
            return new ErrorActionResponse(error);
        }
    };
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
            const response = await dispatch(getUser());

            if (!response.success) {
                dispatch(removeAuthHeader())
            }
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
 * @returns {ActionResponse}
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

            if (data.is_new_user) {
                MixPanel.track('registered_new_account');
                MixPanel.track('registered_via_oauth', {
                    service,
                });
            } else {
                MixPanel.track('authenticated_oauth', {
                    service,
                });
            }

            return new ActionResponse(true, data.token);
        } catch (error) {
            return new ActionResponse(false, error.response.data);
        }
    }
};

/**
 * @param {string} username
 * @return {Function}
 */
export const validateUsername = (username) => {
    return async dispatch => {
        try {
            if (username.length === 0) {
                return new SuccessActionResponse({
                    status: UsernameStatusMap.UNKNOWN,
                });
            }

            const {data} = await PublicApi.post('/check-username', {
                username,
            });

            if (!data) {
                return new ErrorActionResponse();
            }

            if (data.is_used) {
                return new SuccessActionResponse({
                    status: UsernameStatusMap.TAKEN,
                });
            }

            return new SuccessActionResponse({
                status: UsernameStatusMap.VALID,
            });
        } catch (error) {
            return new ErrorActionResponse(error);
        }
    }
};

/**
 * @param {string} username
 * @return {Function}
 */
export const setUsername = (username) => {
    return async (dispatch, getState) => {
        const {auth: {user}} = getState();

        if (!username.length) {
            return new ErrorActionResponse();
        }

        try {
            const {data} = await Api.post('/user/change-username', {
                username,
            });

            if (!data) {
                return new ErrorActionResponse();
            }

            MixPanel.track('set_username');

            const newUser = user.updateUsername(username);

            dispatch({
               type: SET_USERNAME_ACTION,
               user: newUser,
            });
        } catch (error) {
            throw new ErrorActionResponse(error);
        }
    }
};
