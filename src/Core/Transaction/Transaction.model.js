import {NetworkApiToAppTypeMap} from "../../Common/constants";

export class Transaction {
    /**
     * @param {Object} data
     * @param {string} [projectId]
     */
    constructor(data, projectId) {
        /** @type string */
        this.id = data.txHash;

        /**
         * Defines whether the transaction was successful or not.
         * @type boolean
         */
        this.status = data.status;

        /**
         * List of contracts addresses that are involved in this transaction.
         * @type string[]
         */
        this.contracts = data.contracts;

        /** @type number */
        this.block = data.block;

        /** @type string */
        this.txHash = data.txHash;

        /** @type string */
        this.from = data.from;

        /** @type string */
        this.to = data.to;

        /** @type number */
        this.gasLimit = data.gasLimit;

        /** @type number */
        this.gasPrice = data.gasPrice;

        /** @type number */
        this.gasUsed = data.gasUsed;

        /** @type number */
        this.nonce = data.nonce;

        /** @type NetworkTypes */
        this.network = NetworkApiToAppTypeMap[data.networkId];

        /** @type string */
        this.projectId = projectId;

        /** @type string */
        this.timestamp = data.timestamp;
    }

    /**
     * @param {Contract[]} contracts
     * @return {boolean}
     */
    isInternalTransaction(contracts) {
        return !contracts.some(contract => contract.address === this.to);
    }

    /**
     * @param {Object} response
     * @param {string} [projectId]
     * @return {Transaction}
     */
    static buildFromResponse(response, projectId) {
        /**
         * @Notice When ever changing the mapping from response data, be sure to check `examples.js` and adjust them
         * accordingly as those mocked responses are used for the Example Project and might break it.
         */
        return new Transaction({
            contracts: response.addresses,
            status: response.status,
            txHash: response.hash,
            block: response.block_number,
            from: response.from,
            to: response.to,
            gasLimit: response.gas,
            gasPrice: response.gas_price,
            gasUsed: response.gas_used,
            nonce: response.nonce,
            timestamp: response.timestamp,
            networkId: parseInt(response.network_id),
        }, projectId);
    }
}
