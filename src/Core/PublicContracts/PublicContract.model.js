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

        /** @type string */
        this.source = data.source;
    }
    static responseTransformer(responseData) {
        return new PublicContract(responseData);
    }
}

export default PublicContract;
