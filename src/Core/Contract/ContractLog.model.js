class ContractLogInput {
    constructor(data) {
        /** @type string */
        this.type = data.type;

        /** @type string */
        this.name = data.name;
    }
}

class ContractLog {
    constructor(data) {
        /** @type string */
        this.id = data.id;

        /** @type string */
        this.name = data.name;

        /** @type ContractLogInput[] */
        this.inputs = data.inputs;
    }

    static buildFromResponse(response) {
        let inputs = [];

        if (response.inputs) {
            inputs = response.inputs.map(input => new ContractLogInput(input));
        }

        return new ContractLog({
            name: response.name,
            id: response.id,
            inputs,
        });
    }
}

export default ContractLog;
