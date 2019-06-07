class ContractFile {
    constructor(data) {
        /** @type string */
        this.id = data.id;

        /** @type string */
        this.address = data.address;

        /** @type string */
        this.name = data.name;
    }

    /**
     * @returns {string}
     */
    getFileName() {
        return `${this.name}.sol`;
    }

    static buildFromResponse(data) {
        return new ContractFile({

        });
    }
}

export default ContractFile;
