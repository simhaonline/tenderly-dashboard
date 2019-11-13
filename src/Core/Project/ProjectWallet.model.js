class ProjectWallet {
    constructor(data) {
        this.id = data.id;

        this.projectId = data.projectId;

        this.walletId = data.walletId;

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
