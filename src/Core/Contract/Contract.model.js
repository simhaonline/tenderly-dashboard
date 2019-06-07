import {NetworkApiToAppTypeMap, NetworkAppToApiTypeMap} from "../../Common/constants";

class Contract {
    /**
     * @param {Object} data
     * @param {ContractTypes} type
     * @param {string} [projectId]
     */
    constructor(data, type, projectId) {
        const contractAddress = data.deployment_information? data.deployment_information.address : data.address;
        const contractNetwork = data.deployment_information? data.deployment_information.network_id : data.network_id;

        /** @type string */
        this.id = contractAddress;

        /** @type string */
        this.projectId = projectId;

        /** @type {string} */
        this.name = data.contract_name;

        /** @type {ContractTypes} */
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

        /** @type ContractFile[] */
        this.files = data.files;

        /** @type ContractFile */
        this.mainFile = data.files;

        if (data.data) {
            /** @type string */
            this.source = data.data.contract_info[data.data.main_contract].source;

            /** @type string */
            this.solidity = Contract.getSolidityVersion(data.data.contract_info[data.data.main_contract].source);
        }
    }

    /**
     * @returns {string}
     */
    getFileName() {
        return `${this.name}.sol`;
    }

    getApiId() {
        return `eth:${NetworkAppToApiTypeMap[this.network]}:${this.id}`;
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

        if (!matches || !matches[1]) {
            return null;
        }

        return matches[1];
    }

    /**
     * @param {Object} data
     * @param {ContractTypes} type
     * @param {string} [projectId]
     * @return {Contract}
     */
    static buildFromResponse(data, type, projectId) {
        return new Contract(data, type, projectId);
    }
}

export default Contract;
