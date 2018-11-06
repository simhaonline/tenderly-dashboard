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

        /** @type Date */
        this.createdAt = data.created_at;
    }

    /**
     * @returns {Project}
     */
    update() {
        return this;
    }
}

export default Project;
