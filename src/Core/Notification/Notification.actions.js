import {Api} from '../../Utils/Api';
import {ErrorActionResponse, SuccessActionResponse} from "../../Common";
import NotificationDestination from "./NotificationDestination.model";

export const FETCH_NOTIFICATION_DESTINATIONS_ACTION = 'FETCH_NOTIFICATION_DESTINATIONS';

export const fetchNotificationDestinations = () => {
    return async dispatch => {
        try {
            const {data} = await Api.get('/account/me/delivery-channels');

            if (!data || !data.delivery_channels) {
                return new ErrorActionResponse();
            }

            const destinations = data.delivery_channels.map(destination => NotificationDestination.buildFromResponse(destination));

            dispatch({
                type: FETCH_NOTIFICATION_DESTINATIONS_ACTION,
                destinations,
            });

            return new SuccessActionResponse();
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    };
};

/**
 * @param {NotificationDestination} destination
 */
export const updateNotificaitonDestination = (destination) => {
    return async dispatch => {
        try {
            const {data} = await Api.post(``);

            if (!data) {
                return new ErrorActionResponse();
            }



        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
};

/**
 * @param {string} id
 */
export const deleteNotificaitonDestination = (id) => {
    return async dispatch => {
        try {
            const {data} = await Api.post(``);

            if (!data) {
                return new ErrorActionResponse();
            }

            return new SuccessActionResponse();
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
};

/**
 * @param {string} authCode
 */
export const connectSlackChannel = (authCode) => {
    return async dispatch => {
        try {
            const {data} = await Api.post('/account/me/slack/connect', {
                type: 'slack',
                code: authCode,
            });

            if (!data) {
                return new ErrorActionResponse();
            }

            return new SuccessActionResponse();
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
};
