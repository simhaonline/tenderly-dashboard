import {Network} from "../models";

class PrivateNetwork extends Network{
    constructor(data) {
        super(data);

        /** @type {Project.id} */
        this.projectId = data.projectId;

        /** @type {string} */
        this.status = data.status;

        /** @type {string} */
        this.color = data.color;
    }

    /**
     * @param {string} networkId
     * @param {Project.id} projectId
     * @param {string} color
     * @returns {PrivateNetwork}
     */
    static buildFromNetworkId(networkId, projectId, color) {
        return new PrivateNetwork({
            id: networkId,
            name: 'Private',
            shorthand: 'P',
            apiId: networkId,
            routeId: networkId,
            projectId: projectId,
            status: 'online',
            color,
        });
    }
}

export default PrivateNetwork;
