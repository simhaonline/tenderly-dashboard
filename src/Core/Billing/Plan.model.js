class Plan {
    constructor(data) {
        /** @type {string} */
        this.id = data.id;

        /** @type {UserPlanTypes} */
        this.type = data.type;

        /** @type {boolean} */
        this.trial = data.trial;

        /** @type {Date} */
        this.trialEndsAt = data.trialEndsAt;
    }
}

export default Plan;
