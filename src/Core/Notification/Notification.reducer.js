import {LOG_OUT_ACTION} from "../Auth/Auth.actions";
import {
    CREATE_NOTIFICATION_DESTINATION_ACTION,
    DELETE_NOTIFICATION_DESTINATION_ACTION,
    FETCH_NOTIFICATION_DESTINATIONS_ACTION
} from "./Notification.actions";
import * as _ from "lodash";

const initialState = {
    destinations: {},
    destinationsLoaded: false,
};

const NotificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NOTIFICATION_DESTINATIONS_ACTION:
            return {
                ...state,
                destinations: {
                    ...action.destinations.reduce((data, destination) => {
                        data[destination.id] = destination;

                        return data;
                    }, {}),
                },
                destinationsLoaded: true,
            };
        case CREATE_NOTIFICATION_DESTINATION_ACTION:
            return {
                ...state,
                destinations: {
                    ...state.destinations,
                    [action.destination.id]: action.destination,
                },
            };
        case DELETE_NOTIFICATION_DESTINATION_ACTION:
            return {
                ...state,
                destinations: _.omit(state.destinations, action.destinationId),
            };
        case LOG_OUT_ACTION:
            return initialState;
        default:
            return state;
    }
};

export default NotificationReducer;
