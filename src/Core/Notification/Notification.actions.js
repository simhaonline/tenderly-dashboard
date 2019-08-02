import {Api} from '../../Utils/Api';
import {ErrorActionResponse, SuccessActionResponse} from "../../Common";

export const FETCH_NOTIFICATION_DESTINATIONS_ACTION = 'FETCH_NOTIFICATION_DESTINATIONS';

export const fetchNotificationDestinations = () => {
    return async dispatch => {
        try {
            const {data} = await Api.get('/account/me/delivery-channels');

            const destinations = [];

            console.log(data, destinations);

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
