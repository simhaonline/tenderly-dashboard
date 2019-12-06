import Plan from "./Plan.model";

/**
 * @typedef AccountPlanUsage
 * @property {number} count
 * @property {number} limit
 * @property {boolean} used
 */

class AccountPlan {
    constructor(data) {
        /** @type {Plan} */
        this.plan = data.plan;

        /** @type {boolean} */
        this.isTrialActive = data.isTrialActive;

        /** @type {boolean} */
        this.isPlanActive = data.isPlanActive;

        /** @type {Object.<PlanUsageTypes, AccountPlanUsage>} */
        this.usage = data.usage;
    }

    /**
     * @param {Object} response
     * @param {Object} usage
     * @returns {AccountPlan}
     */
    static buildFromResponse(response, usage) {
        const plan = Plan.buildFromResponse(response.plan);

        return new AccountPlan({
            plan,
            isTrialActive: response.is_trial_active,
            isPlanActive: response.is_plan_active,
            usage,
        });
    }
}

export default AccountPlan;
