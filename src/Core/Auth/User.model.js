class User {
    constructor(data) {
        /** @type string */
        this.id = data.id;

        /** @type string */
        this.email = data.email;

        /** @type string */
        this.firstName = data.first_name;

        /** @type string */
        this.lastName = data.last_name;

        /** @type string */
        this.username = data.username;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`
    }

    /**
     * @param {string} username
     */
    updateUsername(username) {
        this.username = username;

        return this;
    }
}

export default User;
