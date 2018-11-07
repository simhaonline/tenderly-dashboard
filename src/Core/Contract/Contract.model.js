import {ContractTypes, NetworkApiToAppTypeMap} from "../../Common/constants";

class Contract {
    constructor(data, projectId) {
        /** @type string */
        this.id = data.deployment_information.address;

        /** @type string */
        this.projectId = projectId;

        /** @type string */
        this.name = data.contract_name;

        this.type = ContractTypes.PRIVATE;

        /** @type string */
        this.address = data.deployment_information.address;

        /** @type string */
        this.network = NetworkApiToAppTypeMap[data.deployment_information.network_id];

        // @TODO Fix this to not be hardcoded
        /** @type Date */
        this.lastDeploymentAt = data.last_event_occurred_at;

        // @TODO Fix this to not be hardcoded
        /** @type number */
        this.deploymentCount = 5;

        /** @type Date */
        this.lastEventAt = data.last_event_occurred_at;

        /** @type number */
        this.eventCount = data.number_of_exceptions;

        if (data.source) {
            /** @type string */
            this.source = data.source;

            /** @type string */
            this.solidity = Contract.getSolidityVersion(data.source);
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

        const versionRegex = /solidity \^(.*);/g;

        const matches = versionRegex.exec(source);

        return matches[1];
    }
}

export default Contract;
