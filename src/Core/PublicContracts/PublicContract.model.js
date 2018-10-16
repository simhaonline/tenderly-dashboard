import {NetworkTypes} from "../../Common/constants";

const publicContractNetworkMap = {
    'kovan': NetworkTypes.KOVAN,
};

class PublicContract {
    constructor(data) {
        /** @type string */
        this.id = data.ID;

        /** @type string */
        this.name = data.contract_name;

        /** @type string */
        this.address = data.deployment_information.address;

        /** @type string */
        this.network = publicContractNetworkMap[data.deployment_information.network_id];

        if (data.source) {
            /** @type string */
            this.source = data.source;

            /** @type string */
            this.solidity = PublicContract.getSolidityVersion(data.source);
        }
    }

    /**
     * @returns {PublicContract}
     */
    update() {
        return this;
    }

    /**
     * @param {string} source
     * @returns {string|null}
     */
    static getSolidityVersion(source) {
        if (!source) {
            return null;
        }

        const versionRegex = /solidity \^(.*);/g;

        const matches = versionRegex.exec(source);

        return matches[1];
    }

    /**
     * @param {Object} responseData
     * @returns {PublicContract}
     */
    static responseTransformer(responseData) {
        return new PublicContract(responseData);
    }
}

export default PublicContract;
