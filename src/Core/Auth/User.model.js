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
        this.userName = data.userName;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`
    }
}

export default User;
