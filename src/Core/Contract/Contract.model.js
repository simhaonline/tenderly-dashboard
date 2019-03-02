import {NetworkApiToAppTypeMap} from "../../Common/constants";

class Contract {
    constructor(data, type, projectId) {
        const contractAddress = data.deployment_information? data.deployment_information.address : data.address;
        const contractNetwork = data.deployment_information? data.deployment_information.network_id : data.network_id;

        /** @type string */
        this.id = contractAddress;

        /** @type string */
        this.projectId = projectId;

        /** @type string */
        this.name = data.contract_name;

        /** @type string */
        this.type = type;

        /** @type string */
        this.address = contractAddress;

        /** @type string */
        this.network = NetworkApiToAppTypeMap[contractNetwork];

        // @TODO Fix this to not be hardcoded
        /** @type Date */
        this.lastDeploymentAt = data.created_at;

        // @TODO Fix this to not be hardcoded
        /** @type number */
        this.deploymentCount = 1;

        /** @type Date */
        this.lastEventAt = data.last_event_occurred_at;

        /** @type number */
        this.eventCount = data.number_of_exceptions;

        if (data.data) {
            /** @type string */
            this.source = data.data.source;

            /** @type string */
            this.solidity = Contract.getSolidityVersion(data.data.source);
        }
    }

    /**
     * @returns {string}
     */
    getFileName() {
        return `${this.name}.sol`;
    }

    /**
     * @returns {Contract}
     */
    update() {
        return this;
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

        return matches[1];
    }
}

export default Contract;
