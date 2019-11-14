import {NetworkApiToAppTypeMap} from "../../Common/constants";

import {Contract} from "../models";

class ProjectContractRevision {
    constructor(data) {
        /** @type {string} */
        this.id = data.id;

        /** @type {string} */
        this.address = data.address;

        /** @type {Network.id} */
        this.network = data.network;

        /** @type {ContractsPush.id} */
        this.push = data.push;
    }

    static buildFromResponse(response) {
        const network = NetworkApiToAppTypeMap[response.network_id] || response.network_id;

        return new ProjectContractRevision({
            id: Contract.generateUniqueId(response.address, network),
            address: response.address,
            network,
        });
    }
}

export default ProjectContractRevision;
