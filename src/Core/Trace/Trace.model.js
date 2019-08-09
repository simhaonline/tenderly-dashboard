import TraceInput from "./TraceInput.model";

export class Trace {
    /**
     * @param {Object} data
     * @param {Trace[]} [calls]
     */
    constructor(data, calls) {
        /** @type string */
        this.functionName = data.functionName;

        /** @type string */
        this.op = data.op;

        /** @type string */
        this.fileName = data.fileName;

        /** @type number */
        this.gasUsed = data.gasUsed;

        /** @type string */
        this.contract = data.contract;

        /** @type string */
        this.depthId = data.depthId;

        /** @type number */
        this.fileId = data.fileId !== null && data.fileId >= 0 ? data.fileId : null;

        /** @type number */
        this.lineNumber = data.lineNumber;

        /** @type Trace[] */
        this.calls = calls;

        /** @type TraceInput[] */
        this.inputVariables = data.inputVariables;

        /** @type TraceInput[] */
        this.outputVariables = data.outputVariables;
    }

    /**
     * Returns the current state of the trace in a json object mapped by name to value map.
     * @return {Object}
     */
    getStateJSON() {
        const data = {};

        data['[FUNCTION]'] = this.functionName;
        data['[OPCODE]'] = this.op;

        if (this.inputVariables) {
            this.inputVariables.forEach(input => {
                if (!data.input) {
                    data.input = {};
                }

                data.input[input.name] = input.value;
            });
        }

        if (this.outputVariables) {
            this.outputVariables.forEach(output => {
                if (!data.output) {
                    data.output = {};
                }

                data.output[output.name] = output.value;
            });
        }

        return data;
    }

    /**
     *
     * @param {Object} rawCallTrace
     * @param {number} depth
     * @param {string} depthId
     */
    static buildFromRawCallTrace(rawCallTrace, depth = 0, depthId = '0') {
        let calls;

        if (rawCallTrace.calls) {
            calls = rawCallTrace.calls.map((trace, index) => Trace.buildFromRawCallTrace(trace, depth + 1, `${depthId}.${index}`));
        }

        const inputVariables = rawCallTrace.decoded_input && rawCallTrace.decoded_input.map(TraceInput.buildFromResponse);
        const outputVariables = rawCallTrace.decoded_output && rawCallTrace.decoded_output.map(TraceInput.buildFromResponse);

        /**
         * @Notice When ever changing the mapping from response data, be sure to check `examples.js` and adjust them
         * accordingly as those mocked responses are used for the Example Project and might break it.
         */
        return new Trace({
            functionName: rawCallTrace.function_name,
            contract: depthId !== '0' ? rawCallTrace.from : rawCallTrace.to,
            op: depthId !== '0' ? rawCallTrace.caller_op : rawCallTrace.function_op,
            fileName: rawCallTrace.contract_name,
            fileId: depthId !== '0' ? rawCallTrace.caller_file_index : rawCallTrace.function_file_index,
            lineNumber: depthId !== '0' ? rawCallTrace.caller_line_number : rawCallTrace.function_line_number,
            gasUsed: rawCallTrace.gas_used,
            inputVariables,
            outputVariables,
            depthId,
        }, calls);
    }

    static buildFromRawStackTrace(rawStackTrace) {
        /**
         * @Notice When ever changing the mapping from response data, be sure to check `examples.js` and adjust them
         * accordingly as those mocked responses are used for the Example Project and might break it.
         */
        return new Trace({
            functionName: rawStackTrace.code,
            contract: rawStackTrace.contract,
            fileName: rawStackTrace.name,
            lineNumber: rawStackTrace.line,
            op: rawStackTrace.op,
            fileId: rawStackTrace.file_index,
        });
    }
}
