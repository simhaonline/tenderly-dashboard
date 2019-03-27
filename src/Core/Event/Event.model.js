export class TracePoint {
    /**
     * @param {Object} data
     * @param {string} originContract
     */
    constructor(data, originContract) {
        /** @type number */
        this.line = data.line;

        /** @type number */
        this.start = data.start;

        /** @type string */
        this.method = data.code;

        /** @type string */
        this.parentMethod = null;

        /** @type string */
        this.contract = data.contract.toLowerCase();

        /** @type boolean */
        this.belongsToContract = originContract === this.contract;

        /** @type string */
        this.contractName = data.name;

        /** @type string */
        this.opCode = data.op;
    }

    /**
     * @param {Object[]} stackTrace
     * @param {string} contract
     * @returns {TracePoint[]}
     */
    static computeFromStackTrace(stackTrace, contract) {
        return stackTrace.map(trace => new TracePoint(trace, contract))
            .filter(trace => !!trace.contract);
    }
}

class Event {
    constructor(data) {
        /** @type string */
        this.id = data.transaction_id;

        /** @type string */
        this.contractId = data.contract_address.toLowerCase();

        /** @type TracePoint[] */
        this.trace = TracePoint.computeFromStackTrace(data.StackTrace, this.contractId);

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
        this.lineNumber = lastTraceData.line;

        /** @type string */
        this.message = Event.getPreviewMessage(data, lastTraceData);

        /** @type string */
        this.description = lastTraceData.method;

        /** @type string */
        this.opCode = lastTraceData.opCode;
    }

    /**
     * @param {TracePoint[]} trace
     * @returns {TracePoint}
     */
    static parseLastTraceData(trace) {
        const lastTraceData = {};

        if (!trace) {
            return lastTraceData;
        }

        return trace[0];
    }

    /**
     * @param {Object} responseData
     * @param {TracePoint} lastTrace
     * @return {string}
     */
    static getPreviewMessage(responseData, lastTrace) {
        if (responseData.Method) {
            return `${lastTrace.opCode}: ${responseData.Method}()`;
        }

        return `Transaction failed: ${lastTrace.opCode}`;
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
