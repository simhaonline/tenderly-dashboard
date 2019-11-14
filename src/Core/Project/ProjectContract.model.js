import {getRouteSlugForNetwork} from "../../Utils/RouterHelpers";

import {NetworkApiToAppTypeMap} from "../../Common/constants";

import Project from "./Project.model";
import ProjectTag from './ProjectTag.model';

class ProjectContract {
    constructor(data) {
        /**
         * Unique ID for project contract that is generated using the static ProjectContract.generateId() method.
         *
         * @type {string}
         * @example
         * username:project-slug:ropsten:0xab21ef13...ac23fe
         */
        this.id = data.id;

        /** @type {Project.id} */
        this.projectId = data.projectId;

        /** @type {Contract.id} */
        this.contractId = data.contractId;

        /** @type {boolean} */
        this.enabled = data.enabled;

        /** @type {string} */
        this.name = data.name;

        /** @type {Network.id} */
        this.network = data.network;

        /** @type {string} */
        this.address = data.address;

        /** @type {number} */
        this.revisionsCount = data.revisionsCount;

        /** @type {ProjectTag[]} */
        this.tags = data.tags;

        /** @type {Contract.id} */
        this.parentContract = data.parentContract;
    }

    getUrl() {
        const {slug, username} = Project.getSlugAndUsernameFromId(this.projectId);

        const networkRoute = getRouteSlugForNetwork(this.network);

        return `/${username}/${slug}/contract/${networkRoute}/${this.address}`;
    };

    /**
     * @returns {null|ProjectTag}
     */
    getLatestTag() {
        if (!this.tags || this.tags.length === 0) return null;

        return this.tags[this.tags.length - 1];
    }

    /**
     * @param {Project.id} projectId
     * @param {Contract.id} contractId
     */
    static generateId(projectId, contractId) {
        return `${projectId}:${contractId}`;
    }

    /**
     * @param {Object} response
     * @param {Project.id} projectId
     * @param {Contract.id} contractId
     * @param {Contract.id} [parentContractId]
     *
     * @returns {ProjectContract}
     */
    static buildFromResponse(response, projectId, contractId, parentContractId = null) {
        const tags = response.tags ? response.tags.map(tag => ProjectTag.buildFromResponse(tag)) : [];
        const network = NetworkApiToAppTypeMap[response.contract.network_id] || response.contract.network_id;

        return new ProjectContract({
            id: ProjectContract.generateId(projectId, contractId),
            projectId,
            contractId,
            enabled: response.include_in_transaction_listing,
            name: response.contract.contract_name,
            network,
            address: response.contract.address,
            revisionsCount: response.previous_versions ? response.previous_versions.length + 1 : 1,
            tags,
            parentContract: parentContractId || contractId,
        });
    }
}

export default ProjectContract;
