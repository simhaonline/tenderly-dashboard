import {UserPlanTypes} from "../../Common/constants";

class Plan {
    constructor(data) {
        /** @type {string} */
        this.id = data.id;

        /** @type {string} */
        this.name = data.name;

        /** @type {UserPlanTypes} */
        this.type = data.type;

        /** @type {number} */
        this.price = data.price;

        /**
         * This Object map contains keys that are defined on the API. This is because they will/can be changed frequently
         * and instead of us creating a parser for everyone we will use the api keys directly.
         *
         * @type {Object}
         */
        this.includes = data.includes;

        /** @type {boolean} */
        this.trialEnabled = data.trialEnabled;

        /** @type {boolean} */
        this.trialRequiresCC = data.trialRequiresCC;

        /** @type {number} */
        this.trialLength = data.trialLength;
    }

    /**
     * @param {Object} response
     * @returns {null|UserPlanTypes|string}
     */
    static getTypeFromApiType(response) {
        /**
         * This is special handling for the one-off grandfather plan that will be used during the transition.
         */
        if (response.id === 'grandfather') {
            return UserPlanTypes.GRANDFATHER;
        }

        switch (response.type) {
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
        const type = Plan.getTypeFromApiType(response);

        return new Plan({
            id: response.id,
            type,
            includes: response.includes,
            price: response.price,
            trialEnabled: response.trial.enabled,
            trialRequiresCC: response.trial.credit_card_required,
            trialLength: response.trial.trial_length,
        });
    }
}

export default Plan;
