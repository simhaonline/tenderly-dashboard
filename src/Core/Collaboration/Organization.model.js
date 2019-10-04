class Organization {
    constructor(data) {
        /** @type string */
        this.id = data.id;

        /** @type string */
        this.slug = data.slug;

        /** @type string */
        this.name = data.name;

        /**
         * Array of User IDs that map to the User model
         * @type string[]
         */
        this.users = data.users;

        /**
         * Array of Project IDs that map to the Project model
         * @type string[]
         */
        this.projects = data.projects;
    }

    getOrganizationInitials() {
        return this.name[0];
    }
}

export default Organization;
