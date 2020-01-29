class ProjectTag {
    constructor(data) {
        /** @type {string} */
        this.label = data.label;

        /** @type {Date} */
        this.createdAt = data.createdAt;
    }

    /**
     * @param {Object} response
     * @returns {ProjectTag}
     */
    static buildFromResponse(response) {
        return new ProjectTag({
            label: response.tag,
            createdAt: response.created_at,
        });
    }
}

export default ProjectTag;
