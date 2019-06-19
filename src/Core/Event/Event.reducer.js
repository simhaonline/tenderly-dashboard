import {FETCH_PUBLIC_CONTRACT_EVENTS_ACTION} from "../PublicContracts/PublicContracts.actions";
import {FETCH_EVENT_FOR_PROJECT_ACTION, FETCH_EVENTS_FOR_PROJECT_ACTION} from "./Event.actions";
import {LOG_OUT_ACTION} from "../Auth/Auth.actions";

const initialState = {
    events: {},
    projectEvents: {},
    // Legacy below
    contractEvents: {},
    contractEventsLoaded: {},
};

const EventReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_OUT_ACTION: {
            return initialState;
        }
        case FETCH_PUBLIC_CONTRACT_EVENTS_ACTION:
            const existingEvents = state.contractEvents[action.network] || {};
            const existingEventsLoaded = state.contractEventsLoaded[action.network] || {};

            const existingContractEvents = existingEvents[action.contractId] || {};

            action.events.forEach(event => {
               existingContractEvents[event.transactionId] = event;
            });

            return {
                ...state,
                contractEvents: {
                    [action.network]: {
                        ...existingEvents,
                        [action.contractId]: {
                            ...existingContractEvents,
                        },
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
        case FETCH_EVENTS_FOR_PROJECT_ACTION:
            const events = action.events.reduce((data, event) => {
                if (state.events[event.id]) {
                    const existingEvent = state.events[event.id];

                    data[event.id] = existingEvent.update(event);
                } else {
                    data[event.id] = event;
                }

                return data;
            }, {});

            const projectPageEvents = Object.keys(events);
            const projectId = action.projectId;

            const existingProjectEvents = state.projectEvents[projectId] || {};

            return {
                ...state,
                events: {
                    ...state.events,
                    ...events,
                },
                projectEvents: {
                    ...state.projectEvents,
                    [projectId]: {
                        ...existingProjectEvents,
                        [action.page]: projectPageEvents,
                    }
                },
            };
        case FETCH_EVENT_FOR_PROJECT_ACTION:
            const event = action.event;
            const data = {};

            if (state.events[event.id]) {
                const existingEvent = state.events[event.id];

                data[event.id] = existingEvent.update(event);
            } else {
                data[event.id] = event;
            }

            return {
                ...state,
                events: {
                    ...state.events,
                    ...data,
                },
            };
        default:
            return state;
    }
};

export default EventReducer;
