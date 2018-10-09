

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

        const lastTraceData = Event.parseLastTraceData(this.trace);



        /** @type number */
        this.lineNumber = lastTraceData.lineNumber;

        /** @type string */
        this.message = lastTraceData.message;

        /** @type string */
        this.description = lastTraceData.description;
    }

    /**
     * @param {Object[]} trace
     * @returns {Object}
     */
    static parseLastTraceData(trace) {
        const lastTraceData = {};

        const lastTrace = trace[0];

        lastTraceData.lineNumber = lastTrace.line;

        lastTraceData.message = `Error: ${lastTrace.op}`;

        lastTraceData.description = lastTrace.code;

        return lastTraceData;
    }

    static responseTransformer(responseData) {
        return new Event(responseData);
    }
}

export default Event;
