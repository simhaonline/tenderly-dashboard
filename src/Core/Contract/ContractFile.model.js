import hljs from "highlight.js";
import hljsDefineSolidity from "highlightjs-solidity";

hljsDefineSolidity(hljs);

class ContractFile {
    constructor(data) {
        /** @type number */
        this.id = data.id;

        /** @type string */
        this.source = data.source;

        const sourceCompiled = hljs.highlight('solidity', data.source).value;

        /** @type Object */
        this.sourceCompiledMap = sourceCompiled.split(/\n/).reduce((map, line, index) => {
            map[index + 1] = line || `\n`;

            if (map.inComment) {
                map[index + 1] = `<span class="hljs-comment">` + map[index + 1];

                if (line.includes('</span>')) {
                    map.inComment = false;
                }
            } else if (line.includes('hljs-comment') && !line.includes('</span>')) {
                map.inComment = true;
            }

            return map;
        }, {});

        /** @type string */
        this.solidityVersion = data.solidityVersion;

        /** @type string */
        this.name = data.name;
    }

    /**
     * @returns {string}
     */
    getFileName() {
        return `${this.name}`;
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

        /**
         * @Notice When ever changing the mapping from response data, be sure to check `examples.js` and adjust them
         * accordingly as those mocked responses are used for the Example Project and might break it.
         */
        return new ContractFile({
            id: data.id,
            name: data.name,
            source: data.source,
            solidityVersion,
        });
    }
}

export default ContractFile;
