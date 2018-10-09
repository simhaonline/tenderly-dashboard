import {FETCH_PUBLIC_CONTRACT_EVENTS_ACTION} from "../PublicContracts/PublicContracts.actions";

const initialState = {
    events: {},
    contractEventsLoaded: {},
};

const EventReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PUBLIC_CONTRACT_EVENTS_ACTION:
            console.log(action.events);
            return state;
        default:
            return state;
    }
};

export default EventReducer;
