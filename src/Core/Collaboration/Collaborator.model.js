import User from "../Auth/User.model";

class Collaborator extends User {
    constructor(data) {
        super(data);

        this.projectId = data.projectId;
    }

}

export default Collaborator;
