import {ContractInputParameter} from "../models";

class ContractLog {
    constructor(data) {
        /** @type string */
        this.id = data.id;

        /** @type string */
        this.name = data.name;

        /** @type ContractInputParameter[] */
        this.inputs = data.inputs;
    }

    static buildFromResponse(response) {
        let inputs = [];

        if (response.inputs) {
            inputs = response.inputs.map(input => ContractInputParameter.buildFromResponse(input));
        }

        return new ContractLog({
            name: response.name,
            id: response.id,
            inputs,
        });
    }
}

export default ContractLog;
