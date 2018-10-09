import {FETCH_PUBLIC_CONTRACT_EVENTS_ACTION} from "../PublicContracts/PublicContracts.actions";

const initialState = {
    contractEvents: {},
    contractEventsLoaded: {},
};

const EventReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PUBLIC_CONTRACT_EVENTS_ACTION:
            const existingEvents = state.contractEvents[action.network] || {};
            const existingEventsLoaded = state.contractEventsLoaded[action.network] || {};

            const existingContractEvents = existingEvents[action.contractId] || [];

            return {
                ...state,
                contractEvents: {
                    [action.network]: {
                        ...existingEvents,
                        [action.contractId]: [
                            ...existingContractEvents,
                            ...action.events,
                        ],
                    },
                },
                contractEventsLoaded: {
                    ...state.contractEventsLoaded,
                    [action.network]: {
                        ...existingEventsLoaded,
                        [action.contractId]: true,
                    }
                }
            };
        default:
            return state;
    }
};

export default EventReducer;
