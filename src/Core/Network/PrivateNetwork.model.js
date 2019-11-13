import {Network} from "../models";

class PrivateNetwork extends Network{
    constructor(data) {
        super(data);

        /** @type {string} */
        this.networkId = data.networkId;

        /** @type {Project.id} */
        this.projectId = data.projectId;

        /** @type {string} */
        this.color = data.color;
    }

}

export default PrivateNetwork;
