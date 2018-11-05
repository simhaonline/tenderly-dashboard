class Project {
    constructor(data) {
        /** @type string */
        this.id = data.slug;

        /** @type string */
        this.name = data.name;

        /** @type string */
        this.slug = data.slug;
    }

    /**
     * @returns {Project}
     */
    update() {
        return this;
    }
}

export default Project;
