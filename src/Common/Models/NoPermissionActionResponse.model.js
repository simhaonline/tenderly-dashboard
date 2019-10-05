import ActionResponse from "./ActionResponse.model";

import {ActionErrorTypes} from "../constants";

export default class NoPermissionActionResponse extends ActionResponse {
    /**
     * @type {Object} data
     * @property {ActionErrorTypes} type
     * @property {string} error
     * @property {CollaboratorPermissionTypes} permission
     */
    data;

    /**
     * @param {CollaboratorPermissionTypes} permission
     */
    constructor(permission) {
        super(false, {
            type: ActionErrorTypes.NO_PERMISSION,
            error: "Insufficient permission to perform this action",
            permission: permission,
        });
    }
}
