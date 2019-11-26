class User {
    constructor(data) {
        /** @type string */
        this.id = data.id;

        /** @type string */
        this.email = data.email;

        /** @type string */
        this.firstName = data.firstName;

        /** @type string */
        this.lastName = data.lastName;

        /** @type string */
        this.username = data.username;

        /** @type boolean */
        this.showDemo = data.showDemo;

        /** @type {boolean} */
        this.eligibleForTrial = data.eligibleForTrial;

        /**
         * This indicates whether the user is eligible to go into the grandfather plan
         * @type {boolean}
         */
        this.eligibleForGrandfathering = data.eligibleForGrandfathering;

        /** @type boolean */
        this.passwordSet = data.passwordSet;
    }

    /**
     * @return {string}
     */
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    getDisplayableIdentifier() {
        const fullName = this.getFullName().trim();

        if (!fullName) {
            return this.email;
        }

        return fullName;
    }

    /**
     * @param {Object} data
     */
    update(data) {
        const updatedData = Object.assign({}, this, data);

        return new User(updatedData);
    }

    /**
     * @param {Object} response
     *
     * @returns {User}
     */
    static buildFromResponse(response) {
        return new User({
            id: response.id,
            email: response.email,
            firstName: response.first_name,
            lastName: response.last_name,
            username: response.username,
            showDemo: !response.hide_demo,
            passwordSet: response.password_is_set,
            eligibleForGrandfathering: true,
        });
    }
}

export default User;
