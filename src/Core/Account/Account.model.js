import {getApiIdForNetwork} from "../../Utils/NetworkHelpers";
import {getRouteSlugForNetwork} from "../../Utils/RouterHelpers";

class Account {
    /**
     * @param {Object} data
     * @param {AccountTypes} type
     */
    constructor(data, type) {
        /**
         * Unique ID for this account that is generated by the static Account.generateUniqueId() method.
         * @type {string}
         * @example
         * ropsten:0xab21ef13...ac23fe
         */
        this.id = data.id;

        /** @type string */
        this.address = data.address;

        /** @type NetworkTypes */
        this.network = data.network;

        /** @type {AccountTypes} */
        this.type = type;
    }

    /**
     * @returns {string}
     */
    getRouteSlug = () => {
        return getRouteSlugForNetwork(this.network);
    };

    /**
     * @param {string} address
     * @param {NetworkTypes} network
     * @return {Account.id}
     */
    static generateUniqueId(address, network) {
        return `${network}:${address}`;
    }

    /**
     * @param {Account.id} accountId
     * @return {string}
     */
    static generateApiId(accountId) {
        const [network, address] = accountId.split(':');

        return `eth:${getApiIdForNetwork(network)}:${address}`;
    }
}

export default Account;
