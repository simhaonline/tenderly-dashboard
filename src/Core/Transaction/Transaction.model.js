import {NetworkApiToAppTypeMap} from "../../Common/constants";

export class Transaction {
    /**
     * @param {Object} data
     * @param {string} projectId
     */
    constructor(data, projectId) {
        /**
         * Defines whether the transaction was successful or not.
         * @type boolean
         */
        this.status = data.status;

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

        /** @type string */
        this.network = NetworkApiToAppTypeMap[data.networkId];

        /** @type string */
        this.projectId = projectId;

        /** @type string */
        this.timestamp = data.timestamp;
    }

    /**
     * @param {Object} response
     * @param {string} projectId
     * @return {Transaction}
     */
    static buildFromResponse(response, projectId) {
        return new Transaction({
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
