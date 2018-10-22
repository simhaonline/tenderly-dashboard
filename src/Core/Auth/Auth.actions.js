import Cookies from "js-cookie";

import {PublicApi, Api} from '../../Utils/Api';

import User from "./User.model";

export const LOG_IN_ACTION = 'LOG_IN';
export const REGISTER_ACTION = 'REGISTER';
export const GET_USER_ACTION = 'GET_USER';

/**
 * @param {string} token
 */
const setAuthHeader = (token) => {
    return async dispatch => {
        Cookies.set('token', token, { path: '/' });
        Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
};

/**
 * @param {string} username
 * @param {string} password
 */
export const loginUser = (username, password) => {
    return async dispatch => {
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
    }
};

export const getUser = () => {
    return async dispatch => {
        const {data} = await Api.get('/user');

        const user = new User(data);

        dispatch({
            type: GET_USER_ACTION,
            user,
        });
    }
};
