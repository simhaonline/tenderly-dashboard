class ProjectWallet {
    constructor(data) {
        /** @type {string} */
        this.id = data.id;

        /** @type {Project.id} */
        this.projectId = data.projectId;

        /** @type {Wallet.id} */
        this.walletId = data.walletId;

        /** @type {string} */
        this.defaultToken = data.defaultToken;

        /** @type {boolean} */
        this.enabled = data.enabled;
    }

    /**
     * @param {Object} response
     * @param {Project.id} projectId
     */
    static buildFromResponse(response, projectId) {
        return new ProjectWallet({
            projectId,
        });
    }
}

export default ProjectWallet;
