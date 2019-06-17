import hljs from "highlight.js";
import hljsDefineSolidity from "highlightjs-solidity";

hljsDefineSolidity(hljs);

class ContractFile {
    constructor(data) {
        /** @type number */
        this.id = data.id;

        /** @type string */
        this.source = data.source;

        /** @type string */
        this.sourceCompiled = hljs.highlight('solidity', data.source).value;

        /** @type string */
        this.solidityVersion = data.solidityVersion;

        /** @type string */
        this.name = data.name;
    }

    /**
     * @returns {string}
     */
    getFileName() {
        return `${this.name}.sol`;
    }

    /**
     * @param {string} source
     * @returns {string|null}
     */
    static getSolidityVersion(source) {
        if (!source) {
            return null;
        }

        const versionRegex = /solidity (.*);/g;

        const matches = versionRegex.exec(source);

        if (!matches || !matches[1]) {
            return null;
        }

        return matches[1];
    }

    /**
     * @param {Object} data
     * @return {ContractFile}
     */
    static buildFromResponse(data) {
        const solidityVersion = ContractFile.getSolidityVersion(data.source);

        return new ContractFile({
            id: data.id,
            name: data.name,
            source: data.source,
            solidityVersion,
        });
    }
}

export default ContractFile;
