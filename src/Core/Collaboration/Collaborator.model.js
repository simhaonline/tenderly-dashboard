import moment from "moment";

import User from "../Auth/User.model";
import {CollaboratorPermissionApiToAppTypeMap, CollaboratorPermissionAppToApiTypeMap} from "../../Common/constants";

class Collaborator extends User {
    /**
     * @param {Object} data
     */
    constructor(data) {
        super(data);

        /** @type {Project.id} */
        this.projectId = data.projectId;

        /** @type {CollaboratorPermissions} */
        this.permissions = data.permissions;

        /** @type {Date} */
        this.addedAt = data.addedAt;
    }

    /**
     * @param {Object} apiPermissions
     *
     * @returns {CollaboratorPermissions}
     */
    static transformPermissionsToApp(apiPermissions) {
        return Object.keys(apiPermissions).reduce((data, permission) => {
            data[CollaboratorPermissionApiToAppTypeMap[permission]] = apiPermissions[permission];

            return data;
        }, {});
    }

    /**
     * @param {CollaboratorPermissions} appPermissions
     *
     * @returns {Object}
     */
    static transformPermissionsToApiPayload(appPermissions) {
        return Object.keys(appPermissions).reduce((data, permission) => {
            data[CollaboratorPermissionAppToApiTypeMap[permission]] = appPermissions[permission];

            return data;
        }, {});
    }

    /**
     * @param {Object} response
     * @param {Project.id} projectId
     *
     * @return {Collaborator}
     */
    static buildFromResponse(response, projectId) {
        return new Collaborator({
            ...response.user,
            projectId,
            addedAt: moment(response.added_at),
            permissions: Collaborator.transformPermissionsToApp(response.permissions),
        });
    }
}


export default Collaborator;
