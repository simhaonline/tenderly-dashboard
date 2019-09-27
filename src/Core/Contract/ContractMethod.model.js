class ContractMethod {
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
     * @param {number} lineNumber
     * @param {string} name
     *
     * @returns {string}
     */
    static generateMethodId(lineNumber, name) {
        return `${lineNumber}:${name}`;
    }

    /**
     * @param {Object} response
     * @return {ContractMethod}
     */
    static buildFromResponse(response) {
        return new ContractMethod({
            id: ContractMethod.generateMethodId(response.line_number, response.name),
            name: response.name,
            lineNumber: response.line_number,
            inputs: response.inputs ? response.inputs.map(input => input.name) : [],
        });
    }
}

export default ContractMethod;
