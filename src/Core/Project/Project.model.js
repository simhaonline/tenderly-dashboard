class Project {
    constructor(data) {
        /** @type string */
        this.id = data.name;

        /** @type string */
        this.name = data.name;

        /** @type string */
        this.slug = data.name;
    }
}

export default Project;
