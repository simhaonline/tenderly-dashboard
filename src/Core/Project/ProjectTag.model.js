class ProjectTag {
    constructor(data) {
        /** @type {string} */
        this.label = data.label;

        /** @type {Date} */
        this.createdAt = data.createdAt;
    }
}

export default ProjectTag;
