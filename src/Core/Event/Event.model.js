

class Event {
    constructor(data) {
        /** @type string */
        this.id = data.transaction_id;

        /** @type Object[] */
        this.trace = data.StackTrace;

        /** @type string */
        this.contractId = data.contract_address;

        if (data.Method) {
            /** @type string */
            this.method = data.Method;
        }

        /** @type string */
        this.transactionId = data.transaction_id;

        /** @type number */
        this.block = data.block_number;

        /** @type Date */
        this.timestamp = data.CreatedAt;

        const lastTraceData = Event.parseLastTraceData(this.trace);

        /** @type number */
        this.lineNumber = lastTraceData.lineNumber;

        /** @type string */
        this.message = Event.getPreviewMessage(data, lastTraceData);

        /** @type string */
        this.description = lastTraceData.description;

        /** @type string */
        this.opCode = lastTraceData.opCode;
    }

    /**
     * @param {Object[]} trace
     * @returns {Object}
     */
    static parseLastTraceData(trace) {
        const lastTraceData = {};

        if (!trace) {
            return lastTraceData;
        }

        const lastTrace = trace[0];

        lastTraceData.lineNumber = lastTrace.line;

        lastTraceData.opCode = lastTrace.op;

        lastTraceData.description = lastTrace.code;

        lastTraceData.contractId = lastTrace.contract;

        return lastTraceData;
    }

    static getPreviewMessage(responseData, lastTrace) {
        if (responseData.Method) {
            return `${lastTrace.opCode}: ${responseData.Method}()`;
        }

        return `Transaction Error: ${lastTrace.opCode}`;
    }

    /**
     * @param {Object} data
     * @return {Event}
     */
    update(data) {
        return this;
    }

    static responseTransformer(responseData) {
        return new Event(responseData);
    }
}

export default Event;
