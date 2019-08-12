class ContractMethodModel {
    constructor(data) {
        /** @type string */
        this.id = data.id;

        /** @type string */
        this.name = data.name;

        /** @type number */
        this.lineNumber = data.lineNumber;

        /** @type string[] */
        this.inputs = data.inputs;
    }

    getDeclarationPreview() {
        return `${this.name}(${this.inputs.join(', ')})`
    }

    /**
     * @param {Object} response
     * @return {ContractMethodModel}
     */
    static buildFromResponse(response) {
        return new ContractMethodModel({
            id: `${response.LineNumber}:${response.Name}`,
            name: response.Name,
            lineNumber: response.LineNumber,
            inputs: response.Inputs ? response.Inputs.map(input => input.name) : [],
        });
    }
}

export default ContractMethodModel;
