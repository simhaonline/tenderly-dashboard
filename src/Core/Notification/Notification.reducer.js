import {LOG_OUT_ACTION} from "../Auth/Auth.actions";
import {FETCH_NOTIFICATION_DESTINATIONS_ACTION} from "./Notification.actions";

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
        case LOG_OUT_ACTION:
            return initialState;
        default:
            return state;
    }
};

export default NotificationReducer;
