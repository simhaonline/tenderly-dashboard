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
        this.isPublic = data.isPublic;

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
            mainFile = files[data.data.main_contract];
        }

        const con = new Contract({
            name: data.contract_name,
            address: data.address,
            networkId: data.network_id,
            creationTx: data.creation_tx,
            isPublic: data.public,
            createdAt: data.created_at,
            lastEventAt: data.last_event_occurred_at,
            verifiedAt: data.verification_date,
            files,
            mainFile,
        }, projectId);

        console.log(con, data);

        return con;
    }
}

export default Contract;
