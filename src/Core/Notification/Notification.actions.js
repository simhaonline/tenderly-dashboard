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
