import {NetworkApiToAppTypeMap} from "../../Common/constants";

import {Contract} from "../models";
import ProjectTag from "./ProjectTag.model";

class ProjectContractRevision {
    constructor(data) {
        /** @type {Contract.id} */
        this.id = data.id;

        /** @type {string} */
        this.address = data.address;

        /** @type {Network.id} */
        this.network = data.network;

        /** @type {ContractsPush.id} */
        this.push = data.push;

        /** @type {boolean} */
        this.enabled = data.enabled;

        /** @type {ProjectTag[]} */
        this.tags = data.tags;
    }

    /**
     * @returns {null|ProjectTag}
     */
    getLatestTag() {
        if (!this.tags || this.tags.length === 0) return null;

        return this.tags[0];
    }

    update(data) {
        const updatedData = Object.assign({}, this, data);

        return new ProjectContractRevision(updatedData);
    }

    static buildFromResponse(response) {
        const {contract} = response;

        const tags = response.tags ? response.tags.map(tag => ProjectTag.buildFromResponse(tag)) : [];

        const network = NetworkApiToAppTypeMap[contract.network_id] || contract.network_id;

        return new ProjectContractRevision({
            id: Contract.generateUniqueId(contract.address, network),
            address: contract.address,
            network,
            enabled: response.include_in_transaction_listing,
            tags,
        });
    }
}

export default ProjectContractRevision;
