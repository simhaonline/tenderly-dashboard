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

        /** @type boolean */
        this.showDemo = !data.hide_demo;

        /** @type boolean */
        this.passwordSet = data.password_is_set;
    }

    /**
     * @return {string}
     */
    getFullName() {
        return `${this.firstName} ${this.lastName}`
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
        const updateKeys = Object.keys(data);

        updateKeys.forEach(update => {
            if (this.hasOwnProperty(update)) {
                this[update] = data[update];
            }
        });

        return this;
    }
}

export default User;
