import Cookies from "js-cookie";
import * as Sentry from "@sentry/browser";
import jwt from "jsonwebtoken";

import {PublicApi, Api, StreamingApi} from '../../Utils/Api';
import Analytics from "../../Utils/Analytics";
import Intercom from "../../Utils/Intercom";
import FullStory from "../../Utils/FullStory";
import {isInternalUserByEmail} from "../../Utils/UserHelpers";
import {asyncActionWrapper} from "../../Utils/ActionHelpers";

import User from "./User.model";
import {ErrorActionResponse, SuccessActionResponse, ActionResponse} from "../../Common";
import {UsernameStatusMap} from "../../Common/constants";

import {dispatchExampleProject} from "../Project/Project.actions";

export const LOG_IN_ACTION = 'LOG_IN';
export const LOG_OUT_ACTION = 'LOG_OUT';
export const REGISTER_ACTION = 'REGISTER';
export const GET_USER_ACTION = 'GET_USER';
export const COMPLETE_ONBOARDING = 'COMPLETE_ONBOARDING';
export const RETRIEVE_TOKEN_ACTION = 'RETRIEVE_TOKEN';
export const SET_USERNAME_ACTION = 'SET_USERNAME';
export const SET_PASSWORD_ACTION = 'SET_PASSWORD';
export const UPDATE_USER_ACTION = 'UPDATE_USER';

/**
 * @param {string} token
 */
const setAuthHeader = (token) => {
    return async () => {
        if (process.env.NODE_ENV !== 'development') {
            Cookies.set('token', token, { path: '/', expires: 30, domain: '.tenderly.dev'});
        } else {
            Cookies.set('token', token, { path: '/', expires: 30});
        }

        Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        StreamingApi.setAuthentication(token);
    }
};

const removeAuthHeader = () => {
    return async () => {
        Cookies.remove('token');
        Cookies.remove('token', {domain: '.tenderly.dev'});
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
                login: username,
                password,
            });

            if (!data) {
                return;
            }

            dispatch({
                type: LOG_IN_ACTION,
                token: data.token,
            });

            Intercom.boot();

            dispatch(setAuthHeader(data.token));
            await dispatch(getUser());

            return new ActionResponse(true, data.token);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
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
            await dispatch(getUser());

            return new ActionResponse(true, data.token);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    };
};

export const logoutUser = () => {
    return async dispatch => {
        Intercom.shutdown();

        dispatch({
            type: LOG_OUT_ACTION,
        });

        dispatch(removeAuthHeader());
    }
};

/**
 * @param {string} [token]
 * @returns {ActionResponse}
 */
export const getUser = (token) => {
    return async dispatch => {
        try {
            const {data} = await Api.get('/user');

            if (!data.user) {
                return new ErrorActionResponse();
            }

            const user = User.buildFromResponse(data.user);
            let impersonating = false;

            if (token) {
                const decodedToken = jwt.decode(token);

                impersonating = !!decodedToken.impersonate;
            }

            if (user.showDemo) {
                dispatchExampleProject(dispatch, user);
            }

            if (!impersonating) {
                Analytics.identifyUser(user);
                Intercom.setUser(user);

                if (isInternalUserByEmail(user.email)) {
                    FullStory.disable();
                } else {
                    FullStory.identifyUser(user);
                }
            }

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
            console.error(error);
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
    return async () => {
        try {
            await Api.post('/user/change-password', {
                "old_password": oldPassword,
                "new_password": newPassword,
            });

            return new SuccessActionResponse();
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
};

/**
 * @param {String} newPassword
 * @returns {Function}
 */
export const setPassword = (newPassword) => {
    return async dispatch => {
        try {
            const {data} = await Api.post('/user/change-password', {
                "new_password": newPassword,
            });

            dispatch({
               type: SET_PASSWORD_ACTION,
            });

            return new SuccessActionResponse(data.ok);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
};

/**
 * @param {string} email
 * @return {Function}
 */
export const recoverAccount = (email) => {
    return async () => {
        try {
            if (!email) {
                return new ErrorActionResponse('Invalid e-mail address.');
            }

            const {data} = await PublicApi.post('/reset-password', {
                email,
            });

            return new SuccessActionResponse(data);
        } catch (error) {
            console.error(error);
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
    return async () => {
        try {
            const {data} = await PublicApi.post('/reset-password-set', {
                code,
                new_password: newPassword,
            });

            if (!data || !data.token) {
                return new ErrorActionResponse();
            }

            return new SuccessActionResponse(data.token);
        } catch (error) {
            console.error(error);
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
            const response = await dispatch(getUser(token));

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

            if (!data || !data.token) {
                return ErrorActionResponse();
            }

            dispatch({
                type: LOG_IN_ACTION,
                token: data.token,
            });
            Intercom.boot();
            dispatch(setAuthHeader(data.token));
            await dispatch(getUser());

            return new SuccessActionResponse(data.token);
        } catch (error) {
            return new ErrorActionResponse(error);
        }
    }
};

/**
 * @param {string} username
 * @return {Function}
 */
export const validateUsername = (username) => {
    return async () => {
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

            if (data.hasOwnProperty('is_valid') && !data.is_valid) {
                return new SuccessActionResponse({
                    status: UsernameStatusMap.INVALID,
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

            const newUser = user.update({
                username,
            });

            dispatch({
               type: SET_USERNAME_ACTION,
               user: newUser,
            });

            return new SuccessActionResponse(newUser);
        } catch (error) {
            return new ErrorActionResponse(error);
        }
    }
};

/**
 *
 * @param {Object} updates
 * @return {Function}
 */
export const updateUser = (updates) => {
    return async (dispatch, getState) => {
        try {
            const payload = {};

            if (updates.firstName) {
                payload.first_name = updates.firstName;
            }

            if (updates.lastName) {
                payload.last_name = updates.lastName;
            }

            if (updates.hasOwnProperty('showDemo')) {
                payload.hide_demo = !updates.showDemo;
            }

            const {data} = await Api.patch('/user/change-details', payload);

            if (!data || !data.success) {
                return new ErrorActionResponse();
            }

            const {auth: {user}} = getState();

            const newUser = user.update({
                ...updates,
            });

            dispatch({
                type: UPDATE_USER_ACTION,
                user: newUser,
            });

            return new SuccessActionResponse(newUser);
        } catch (error) {
            return new ErrorActionResponse(error);
        }
    }
};

/**
 * @param {string} code
 */
export const verifyUserEmail = code => asyncActionWrapper('verifyUserEmail', async dispatch => {
    await Api.post('/account/me/confirm-email', {
        code,
    });

    return new SuccessActionResponse();
});
