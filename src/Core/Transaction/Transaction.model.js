import {NetworkApiToAppTypeMap} from "../../Common/constants";

export class Transaction {
    constructor(data) {
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
        this.gas = data.gas;

        /** @type number */
        this.gasPrice = data.gasPrice;

        /** @type number */
        this.gasUsed = data.gasUsed;

        /** @type number */
        this.nonce = data.nonce;

        /** @type string */
        this.network = NetworkApiToAppTypeMap[data.networkId];
    }

    static buildFromResponse(response) {
        return new Transaction({
            status: response.Status,
            txHash: response.Hash,
            block: response.BlockNumber,
            from: response.From,
            to: response.To,
            gas: response.Gas,
            gasPrice: response.GasPrice,
            gasUsed: response.GasUsed,
            nonce: response.Nonce,
            networkId: parseInt(response.NetworkID),
        });
    }
}
