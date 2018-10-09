class Event {
    constructor(data) {
        /** @type Object[] */
        this.trace = data.StackTrace;

        /** @type string */
        this.transactionId = data.transaction_id;

        /** @type string */
        this.contractId = data.contract_id;

        /** @type number */
        this.block = data.block_number;

        /** @type Date */
        this.timestamp = data.CreatedAt;
    }
    static responseTransformer(responseData) {
        return new Event(responseData);
    }
}

export default Event;
