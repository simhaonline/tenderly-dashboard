import {Api} from "../../Utils/Api";
import Event from './Event.model';

import {ErrorActionResponse, SuccessActionResponse} from "../../Common";
import {NetworkAppToApiTypeMap} from "../../Common/constants";

export const FETCH_EVENTS_FOR_PROJECT_ACTION = 'FETCH_EVENTS_FOR_PROJECT';
export const FETCH_EVENT_FOR_PROJECT_ACTION = 'FETCH_EVENT_FOR_PROJECT';

/**
 * @deprecated
 * @param {string} projectId
 * @param {number} page
 */
export const fetchEventsForProject = (projectId, page = 1) => {
    return async (dispatch) => {
        try {
            const {data} = await Api.get(`/account/me/project/${projectId}/events`, {
                params: {
                    page,
                },
            });

            if (!data) {
                return new SuccessActionResponse([]);
            }

            const events = data.map(Event.responseTransformer);

            dispatch({
                type: FETCH_EVENTS_FOR_PROJECT_ACTION,
                events,
                projectId,
                page,
            });

            return new SuccessActionResponse(events);
        } catch (error) {
            return new ErrorActionResponse(error);
        }
    }
};

/**
 * @deprecated
 * @param {string} projectId
 * @param {string} network
 * @param {string} eventId
 */
export const fetchEventForProject = (projectId, network, eventId) => {
    return async dispatch => {
        try {
            const networkId = NetworkAppToApiTypeMap[network];

            const {data} = await Api.get(`/project/${projectId}/event/${networkId}/${eventId}`);

            if (!data) {
                return new ErrorActionResponse();
            }

            const event = Event.responseTransformer(data);

            dispatch({
                type: FETCH_EVENT_FOR_PROJECT_ACTION,
                event,
                projectId,
            });

            return new SuccessActionResponse(event);
        } catch (error) {
            return new ErrorActionResponse(error);
        }
    }
};
