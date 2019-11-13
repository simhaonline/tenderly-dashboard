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

        /** @type {boolean} */
        this.enabled = data.enabled;

        /** @type {NetworkTypes} */
        this.network = data.network;

        /** @type {string} */
        this.address = data.address;

        /** @type {ProjectTag[]} */
        this.tags = data.tags;

        /** @type {ProjectContract.id} */
        this.parentContract = data.parentContract;
    }

    /**
     * @param {Project.id} projectId
     * @param {Contract.id} contractId
     */
    static generateId(projectId, contractId) {
        return `${projectId}:${contractId}`;
    }
}

export default ProjectContract;
