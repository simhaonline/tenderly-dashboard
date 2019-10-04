import User from "../Auth/User.model";

class Collaborator extends User {
    /**
     * @param {Object} data
     */
    constructor(data) {
        super(data);

        this.projectId = data.projectId;
    }

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
        });
    }
}


export default Collaborator;
