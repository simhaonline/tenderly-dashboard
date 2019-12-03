import {UserPlanTypes} from "../../Common/constants";

class Plan {
    constructor(data) {
        /** @type {string} */
        this.id = data.id;

        /** @type {string} */
        this.slug = data.slug;

        /** @type {UserPlanTypes} */
        this.type = data.type;

        /** @type {number} */
        this.price = data.price;

        /** @type {boolean} */
        this.isTrialActive = data.isTrialActive;

        /** @type {boolean} */
        this.isPlanActive = data.isPlanActive;

        /** @type {Object} */
        this.includes = data.includes;

        /** @type {Object} */
        this.trialInfo = data.trialInfo;
    }

    static getTypeFromApiType(apiType) {
        switch (apiType) {
            case "free":
                return UserPlanTypes.FREE;
            case "pro":
                return UserPlanTypes.PRO;
            default:
                return null;
        }
    }

    /**
     * @param {Object} response
     * @returns {Plan}
     */
    static buildFromResponse(response) {
        const type = Plan.getTypeFromApiType(response.plan.type);

        return new Plan({
            id: response.id,
            type,
            slug: response.plan_id,
            price: response.plan.price,
            isTrialActive: response.is_trial_active,
            isPlanActive: response.is_plan_active,
            includes: response.plan.includes,
            trialInfo: {
                enabled: response.plan.trial.enabled,
                creditCardRequired: response.plan.trial.credit_card_required,
                trialLength: response.plan.trial.trial_length,
            },
        });
    }
}

export default Plan;
