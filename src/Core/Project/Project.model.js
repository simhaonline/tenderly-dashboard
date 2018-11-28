class Project {
    constructor(data) {
        /** @type string */
        this.id = data.slug;

        /** @type string */
        this.name = data.name;

        /** @type string */
        this.slug = data.slug;

        /** @type Date */
        this.lastPushAt = data.last_push_at;

        /** @type boolean */
        this.isSetup = !!data.last_push_at;

        /** @type Date */
        this.createdAt = data.created_at;
    }

    /**
     * @param {Object} data
     * @return {Project}
     */
    update(data) {
        this.lastPushAt = data.last_push_at;
        this.isSetup = !!data.last_push_at;

        return this;
    }
}

export default Project;
