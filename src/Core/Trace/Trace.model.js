import {decodeBase64ToHex} from "../../Utils/Ethereum";

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
        this.gasLeft = data.gasLeft;

        /** @type number */
        this.gasUsed = data.gasUsed;

        /** @type number */
        this.gasRefunded = data.gasRefunded;

        /** @type string */
        this.from = data.from;

        /** @type string */
        this.to = data.to;

        /** @type string */
        this.contract = data.contract;

        /** @type boolean */
        this.hasErrored = data.hasErrored;

        /** @type {string} */
        this.errorMessage = data.errorMessage;

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

        /** @type string */
        this.rawInput = data.rawInput;

        /** @type string */
        this.rawOutput = data.rawOutput;

        /** @type TraceInput[] */
        this.stateVariables = data.stateVariables;

        /** @type TraceInput[] */
        this.localVariables = data.localVariables;
    }

    /**
     * Returns the current state of the trace in a json object mapped by name to value map.
     * @return {Object}
     */
    getStateJSON() {
        const data = {};

        data['[FUNCTION]'] = this.functionName;
        data['[OPCODE]'] = this.op;

        if (!!this.errorMessage) {
            data['[ERROR]'] = this.errorMessage;
        }

        if (this.inputVariables) {
            this.inputVariables.forEach(input => {
                if (!data.input) {
                    data.input = {};
                }

                data.input[input.name] = input.value;
            });
        } else if (this.rawInput) {
            data['[INPUT]'] = decodeBase64ToHex(this.rawInput);
        }


        if (this.outputVariables) {
            this.outputVariables.forEach(output => {
                if (!data.output) {
                    data.output = {};
                }

                data.output[output.name] = output.value;
            });
        } else if (this.rawOutput) {
            data['[OUTPUT]'] = decodeBase64ToHex(this.rawOutput);
        }

        if (this.stateVariables) {
            this.stateVariables.forEach(output => {
                if (!data.state) {
                    data.state = {};
                }

                data.state[output.name] = output.value;
            });
        }

        if (this.localVariables) {
            this.localVariables.forEach(output => {
                if (!data.local_variables) {
                    data.local_variables = {};
                }

                data.local_variables[output.name] = output.value;
            });
        }

        return data;
    }

    /**
     * @param {Object} rawCallTrace
     * @param {string} depthId
     * @param {boolean} hasChildren
     *
     * @return {{op: string, contract: string, lineNumber: string, fileId: string, hasErrored: boolean}}
     */
    static extractTraceData (rawCallTrace, depthId, hasChildren) {
        if (depthId === '0') {
            return {
                contract: rawCallTrace.to,
                op: rawCallTrace.function_op,
                fileId: rawCallTrace.function_file_index,
                lineNumber: rawCallTrace.function_line_number,
                hasErrored: false,
            }
        }

        const hasErrored = !!rawCallTrace.error_op;

        if (!hasChildren && hasErrored) {
            return {
                contract: rawCallTrace.from,
                op: rawCallTrace.error_op,
                fileId: rawCallTrace.error_file_index,
                lineNumber: rawCallTrace.error_line_number,
                hasErrored: hasErrored,
            }
        }

        return {
            contract: rawCallTrace.from,
            op: rawCallTrace.caller_op,
            fileId: rawCallTrace.caller_file_index,
            lineNumber: rawCallTrace.caller_line_number,
            hasErrored: false,
        }
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
        const stateVariables = rawCallTrace.caller_states && rawCallTrace.caller_states.map(TraceInput.buildFromResponse);
        const localVariables = rawCallTrace.caller_variables && rawCallTrace.caller_variables.map(TraceInput.buildFromResponse);

        const traceData = Trace.extractTraceData(rawCallTrace, depthId, !!calls);

        /**
         * @Notice When ever changing the mapping from response data, be sure to check `examples.js` and adjust them
         * accordingly as those mocked responses are used for the Example Project and might break it.
         */
        return new Trace({
            functionName: rawCallTrace.function_name,
            from: rawCallTrace.from,
            to: rawCallTrace.to,
            fileName: rawCallTrace.contract_name,
            contract: traceData.contract,
            op: traceData.op,
            fileId: traceData.fileId,
            lineNumber: traceData.lineNumber,
            hasErrored: traceData.hasErrored,
            gasLeft: rawCallTrace.gas,
            gasUsed: rawCallTrace.gas_used,
            gasRefunded: rawCallTrace.refund_gas || 0,
            errorMessage: rawCallTrace.error,
            inputVariables,
            outputVariables,
            stateVariables,
            localVariables,
            depthId,
            rawInput: rawCallTrace.input,
            rawOutput: rawCallTrace.output,
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
            errorMessage: rawStackTrace.error,
            fileId: rawStackTrace.file_index,
        });
    }
}
