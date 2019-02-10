import ActionResponse from "./ActionResponse.model";

import {ActionErrorTypes} from "../constants";

function parseActionError(error) {
    if (error.response) {
        const {status, data} = error.response;

        return {
            type: ActionErrorTypes.API,
            status,
            error: data,
        }
    }

    return {
        type: ActionErrorTypes.GENERAL,
        error: error,
    }
}

export default class ErrorActionResponse extends ActionResponse {
    /**
     * @param {*} error
     */
    constructor(error) {
        const parsedError = parseActionError(error);

        super(false, parsedError);
    }
}
