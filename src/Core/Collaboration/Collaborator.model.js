import User from "../Auth/User.model";

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
    }

    /**
     * @param {Object} apiPermissions
     *
     * @returns {CollaboratorPermissions}
     */
    static transformPermissionsToApp(apiPermissions) {}

    /**
     * @param {CollaboratorPermissions} appPermissions
     *
     * @returns {Object}
     */
    static transformPermissionsToApiPayload(appPermissions) {}

    /**
     * @param {Object} response
     * @param {Project.id} projectId
     *
     * @return {Collaborator}
     */
    static buildFromResponse(response, projectId) {
        console.log(response);

        return new Collaborator({
            projectId,
            permissions: Collaborator.transformPermissionsToApp(response.permissions),
        });
    }
}


export default Collaborator;
