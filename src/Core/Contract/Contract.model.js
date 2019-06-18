import moment from "moment";

import {NetworkApiToAppTypeMap, NetworkAppToApiTypeMap} from "../../Common/constants";

import ContractFile from "./ContractFile.model";

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
        this.isPublic = !projectId;

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

        /** @type ContractFile[] */
        this.files = data.files;

        /** @type ContractFile */
        this.mainFile = data.mainFile;

        /** @type Date */
        this.lastEventAt = data.lastEventAt ? moment(this.lastEventAt) : null;

        /** @type Date */
        this.createdAt = data.createdAt ? moment(this.createdAt) : null;

        /** @type Date */
        this.verifiedAt = data.verifiedAt ? moment(this.verifiedAt) : null;
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
     * @returns {Contract}
     */
    update() {
        return this;
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
     * @param {Object} data
     * @param {string} [projectId]
     * @return {Contract}
     */
    static buildFromResponse(data, projectId) {
        let files = [];
        let mainFile;

        if (data.data && data.data.contract_info) {
            files = data.data.contract_info.map(ContractFile.buildFromResponse);
            mainFile = files.find(file => file.id === data.data.main_contract);
        }

        return new Contract({
            name: data.contract_name,
            address: data.address,
            networkId: data.network_id,
            creationTx: data.creation_tx,
            isPublic: data.public,
            createdAt: data.created_at,
            errorCount: data.number_of_exceptions,
            lastEventAt: data.last_event_occurred_at,
            verifiedAt: data.verification_date,
            files,
            mainFile,
        }, projectId);
    }
}

export default Contract;
