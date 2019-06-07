import moment from "moment";

import {NetworkApiToAppTypeMap, NetworkAppToApiTypeMap} from "../../Common/constants";

class Contract {
    /**
     * @param {Object} data
     * @param {string} [projectId]
     */
    constructor(data, projectId) {
        /** @type string */
        this.id = data.address;

        /** @type string */
        this.projectId = projectId;

        /** @type boolean */
        this.isPublic = data.public;

        /** @type {string} */
        this.name = data.name;

        /** @type string */
        this.address = data.address;

        /** @type string */
        this.creationTx = data.creationTx;

        /** @type string */
        this.network = NetworkApiToAppTypeMap[data.networkId];

        // @TODO Fix this to not be hardcoded
        /** @type Date */
        this.lastDeploymentAt = data.created_at;

        // @TODO Fix this to not be hardcoded
        /** @type number */
        this.deploymentCount = 1;

        /** @type number */
        this.errorCount = data.errorCount;

        /** @type ContractFile[] */
        this.files = data.files;

        /** @type ContractFile */
        this.mainFile = data.files;

        /** @type Date */
        this.lastEventAt = data.lastEventAt ? moment(this.lastEventAt) : null;

        /** @type Date */
        this.createdAt = data.createdAt ? moment(this.createdAt) : null;

        /** @type Date */
        this.verifiedAt = data.verifiedAt ? moment(this.verifiedAt) : null;

        if (data.data) {
            /**
             * @deprecated
             * @type string
             */
            this.source = data.data.contract_info[data.data.main_contract].source;

            /**
             * @deprecated
             * @type string
             */
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
     * @param {string} [projectId]
     * @return {Contract}
     */
    static buildFromResponse(data, projectId) {
        const con = new Contract({
            ...data,
            name: data.contract_name,
            address: data.address,
            networkId: data.network_id,
            creationTx: data.creation_tx,
            public: data.public,
            createdAt: data.created_at,
            lastEventAt: data.last_event_occurred_at,
            verifiedAt: data.verification_date,
        }, projectId);

        console.log(con, data);

        return con;
    }
}

export default Contract;
