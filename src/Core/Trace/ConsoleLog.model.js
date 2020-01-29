import TraceInput from "./TraceInput.model";

class ConsoleLog {
    constructor(data) {
        this.outputs = data.outputs;
        this.contract = data.contract;
        this.txHash = data.txHash;
        this.line = data.line;
        this.fileId = data.fileId;
        this.method = data.method;
    }

    static buildFromResponse(response, txHash) {
        const outputs = response.arguments.map(argument=> TraceInput.buildFromResponse(argument));
        return new ConsoleLog({
            outputs,
            contract: response.contract,
            txHash,
            line: response.line_number,
            fileId: response.file_index,
            method: response.name,
        })
    }
}

export default ConsoleLog;


