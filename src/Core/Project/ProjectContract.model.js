import {getRouteSlugForNetwork} from "../../Utils/RouterHelpers";

import {NetworkApiToAppTypeMap} from "../../Common/constants";

import Project from "./Project.model";
import ProjectContractRevision from "./ProjectContractRevision.model";

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

        /** @type {string} */
        this.name = data.name;

        /** @type {Network.id} */
        this.network = data.network;

        /** @type {ProjectContractRevision.id} */
        this.mainRevision = data.mainRevision;

        /** @type {ProjectContractRevision[]} */
        this.revisions = data.revisions;
    }

    /**
     * @param {ProjectContractRevision.id} revisionId
     * @returns {ProjectContractRevision}
     */
    getRevision(revisionId) {
        return this.revisions.find(revision => revision.id === revisionId) || null;
    }

    /**
     * @returns {ProjectContractRevision}
     */
    getMainRevision() {
        return this.getRevision(this.mainRevision);
    }

    /**
     * @returns {string}
     */
    getUrl() {
        return this.getUrlForRevision(this.mainRevision);
    };

    /**
     * @param {ProjectContractRevision.id} revisionId
     * @returns {string}
     */
    getUrlForRevision(revisionId) {
        const {slug, username} = Project.getSlugAndUsernameFromId(this.projectId);

        const networkRoute = getRouteSlugForNetwork(this.network);

        const revision = this.getRevision(revisionId);

        return `/${username}/${slug}/contract/${networkRoute}/${revision.address}`;
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
     *
     * @returns {ProjectContract}
     */
    static buildFromResponse(response, projectId, contractId) {
        const network = NetworkApiToAppTypeMap[response.contract.network_id] || response.contract.network_id;

        const revisions = [];

        revisions.push(ProjectContractRevision.buildFromResponse(response));

        if (response.previous_versions) {
            revisions.push(...response.previous_versions.map(revisionResponse => ProjectContractRevision.buildFromResponse(revisionResponse)));
        }

        return new ProjectContract({
            id: ProjectContract.generateId(projectId, contractId),
            projectId,
            name: response.contract.contract_name,
            network,
            mainRevision: contractId,
            revisions,
        });
    }
}

export default ProjectContract;
