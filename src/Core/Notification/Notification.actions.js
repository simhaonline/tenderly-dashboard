import {Api} from '../../Utils/Api';
import {ErrorActionResponse, SuccessActionResponse} from "../../Common";
import {NotificationDestinationAppToApiTypes, OAuthServiceTypeMap, SLACK_REDIRECT_URI} from "../../Common/constants";

import NotificationDestination from "./NotificationDestination.model";

export const FETCH_NOTIFICATION_DESTINATIONS_ACTION = 'FETCH_NOTIFICATION_DESTINATIONS';
export const CREATE_NOTIFICATION_DESTINATION_ACTION = 'CREATE_NOTIFICATION_DESTINATION';

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

            return new SuccessActionResponse(destinations);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    };
};

/**
 * @param {NotificationDestinationTypes} type
 * @param {string} label
 * @param {string} value
 */
export const createNotificationDestination = (type, label, value) => {
    return async dispatch => {
        try {
            const {data} = await Api.post('/account/me/delivery-channel', {
                type: NotificationDestinationAppToApiTypes[type],
                label,
                information: NotificationDestination.transformInformationToApiPayload(type, value),
            });

            if (!data || !data.delivery_channel) {
                return ErrorActionResponse();
            }

            const destination = NotificationDestination.buildFromResponse(data.delivery_channel);

            dispatch({
                type: CREATE_NOTIFICATION_DESTINATION_ACTION,
                destination,
            });

            return new SuccessActionResponse(destination);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
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
 * @param {string} redirectTo
 */
export const connectSlackChannel = (authCode, redirectTo) => {
    return async dispatch => {
        try {
            const {data} = await Api.post('/account/me/slack/connect', {
                type: 'slack',
                code: authCode,
                redirect_uri: `${SLACK_REDIRECT_URI}/oauth/${OAuthServiceTypeMap.SLACK}?redirectTo=${redirectTo}`,
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
