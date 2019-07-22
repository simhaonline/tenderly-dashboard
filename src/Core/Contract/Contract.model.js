import moment from "moment";

import {NetworkApiToAppTypeMap, NetworkAppToApiTypeMap} from "../../Common/constants";

import ContractFile from "./ContractFile.model";
import _ from "lodash";

class Contract {
    /**
     * @param {Object} data
     * @param {object} [projectData]
     */
    constructor(data, projectData) {
        /** @type string */
        this.id = data.address;

        if (projectData) {
            /** @type string */
            this.projectId = projectData.id;

            /** @type boolean */
            this.listening = projectData.listening;
        }

        /** @type boolean */
        this.isPublic = !projectData;

        /** @type boolean */
        this.isVerifiedPublic = !!data.isPublic;

        /** @type {string} */
        this.name = data.name;

        /** @type string */
        this.address = data.address;

        /** @type string */
        this.creationTx = data.creationTx;

        /** @type NetworkTypes */
        this.network = NetworkApiToAppTypeMap[data.networkId];

        // @TODO Fix this to not be hardcoded
        /** @type Date */
        this.lastDeploymentAt = data.createdAt;

        /** @type number */
        this.errorCount = data.errorCount;

        /** @type number */
        this.watchCount = data.watchCount;

        /** @type ContractFile[] */
        this.files = data.files;

        /** @type ContractFile */
        this.mainFile = data.mainFile;

        /** @type Date */
        this.lastEventAt = data.lastEventAt ? moment(data.lastEventAt) : null;

        /** @type Date */
        this.createdAt = data.createdAt ? moment(data.createdAt) : null;

        /** @type Date */
        this.verifiedAt = data.verifiedAt ? moment(data.verifiedAt) : null;
    }

    /**
     * @returns {string}
     */
    getFileName() {
        return `${this.name}.sol`;
    }

    /**
     * @return {string}
     */
    getApiId() {
        return `eth:${NetworkAppToApiTypeMap[this.network]}:${this.id}`;
    }

    /**
     * @param {Object} properties
     * @returns {Contract}
     */
    update(properties) {
        const updatedContract = new Contract({});

        const updateableProperties = _.pick(properties, ['listening']);

        Object.assign(updatedContract, this, updateableProperties);

        return updatedContract;
    }

    /**
     * @return {string|null}
     */
    getMainFileSource() {
        if (!this.mainFile) {
            return null;
        }

        return this.mainFile.source;
    }

    /**
     * @param {number} id
     * @return {ContractFile|null}
     */
    getFileById(id) {
        const file = this.files.find(file => file.id === id);

        if (!file) {
            return null;
        }

        return file;
    }

    /**
     * @return {string|null}
     */
    getMainFileSolidityVersion() {
        if (!this.mainFile) {
            return null;
        }

        return this.mainFile.solidityVersion;
    }

    /**
     * @return {string}
     */
    getUniqueId() {
        return `${this.network}:${this.address}`;
    }

    /**
     * @param {Object} data
     * @param {Object} [projectData]
     * @return {Contract}
     */
    static buildFromResponse(data, projectData) {
        let files = [];
        let mainFile;

        if (data.data && data.data.contract_info) {
            files = data.data.contract_info.map(ContractFile.buildFromResponse);
            mainFile = files.find(file => file.id === data.data.main_contract);
        }

        /**
         * @Notice When ever changing the mapping from response data, be sure to check `examples.js` and adjust them
         * accordingly as those mocked responses are used for the Example Project and might break it.
         */
        return new Contract({
            name: data.contract_name,
            address: data.address,
            networkId: data.network_id,
            creationTx: data.creation_tx,
            isPublic: data.public,
            createdAt: data.created_at,
            errorCount: data.number_of_exceptions,
            watchCount: data.number_of_watches,
            lastEventAt: data.last_event_occurred_at,
            verifiedAt: data.verification_date,
            files,
            mainFile,
        }, projectData);
    }
}

export default Contract;
