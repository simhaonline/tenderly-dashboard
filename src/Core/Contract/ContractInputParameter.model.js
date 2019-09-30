class ContractInputParameter {
    constructor(data) {
        /** @type string */
        this.type = data.type;

        /** @type string */
        this.name = data.name;
    }

    static buildFromResponse(response) {
        return new ContractInputParameter({
            type: response.type,
            name: response.name,
        });
    }
}

export default ContractInputParameter;
