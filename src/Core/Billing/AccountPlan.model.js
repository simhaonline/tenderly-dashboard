import Plan from "./Plan.model";

class AccountPlan {
    constructor(data) {
        /** @type {Plan} */
        this.plan = data.plan;

        /** @type {boolean} */
        this.isTrialActive = data.isTrialActive;

        /** @type {boolean} */
        this.isPlanActive = data.isPlanActive;
    }

    /**
     * @param {Object} response
     * @returns {AccountPlan}
     */
    static buildFromResponse(response) {
        const plan = Plan.buildFromResponse(response.plan);

        return new AccountPlan({
            plan,
        })
    }
}

export default AccountPlan;
