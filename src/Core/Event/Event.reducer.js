import {FETCH_PUBLIC_CONTRACT_EVENTS_ACTION} from "../PublicContracts/PublicContracts.actions";

const initialState = {
    contractEvents: {},
};

const EventReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PUBLIC_CONTRACT_EVENTS_ACTION:
            const existingEvents = state.contractEvents[action.network] || {};

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
                }
            };
        default:
            return state;
    }
};

export default EventReducer;
