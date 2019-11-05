import moment from "moment";
import _ from "lodash";

import {NetworkApiToAppTypeMap, NetworkAppToApiTypeMap} from "../../Common/constants";

import ContractFile from "./ContractFile.model";

class Contract {
    /**
     * @param {Object} data
     * @param {object} [projectData]
     * @param {string} [parentContract]
     */
    constructor(data, projectData, parentContract) {
        /** @type string */
        this.id = data.id;

        if (projectData) {
            /** @type Project.id */
            this.projectId = projectData.id;

            /** @type boolean */
            this.listening = projectData.listening;
        }

        /** @type string */
        this.parent = parentContract || data.address;

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
        this.network = data.network;

        /** @type number */
        this.errorCount = data.errorCount;

        /** @type number */
        this.watchCount = data.watchCount;

        /** @type number */
        this.filesCount = data.filesCount;

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

        /** @type string */
        this.verifiedBy = data.verifiedBy;
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

        const updateableProperties = _.pick(properties, ['listening', 'parent']);

        Object.assign(updatedContract, this, updateableProperties);

        return updatedContract;
    }

    /**
     * @return {ContractFile}
     */
    getMainFile() {
        if (!this.mainFile) {
            return null;
        }

        return this.mainFile;
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

    getVerifiedByLabel() {
        if (this.verifiedBy === 'tenderly') {
            return 'Tenderly';
        }

        if (this.verifiedBy === 'etherscan') {
            return 'Etherscan';
        }

        return '';
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
        return Contract.generateUniqueContractId(this.address, this.network);
    }

    /**
     * @param {string} address
     * @param {NetworkTypes} network
     * @return {string}
     */
    static generateUniqueContractId(address, network) {
        return `${network}:${address}`;
    }

    /**
     * @param {string} uniqueContractId
     * @return {string}
     */
    static generateApiIdFromUniqueId(uniqueContractId) {
        const [network, address] = uniqueContractId.split(':');

        return `eth:${NetworkAppToApiTypeMap[network]}:${address}`;
    }

    /**
     * @param {Object} data
     * @param {Object} [projectData]
     * @param {string} [parentContract]
     * @return {Contract}
     */
    static buildFromResponse(data, projectData, parentContract) {
        let files = [];
        let mainFile;

        if (data.data && data.data.contract_info) {
            files = data.data.contract_info.map(ContractFile.buildFromResponse);
            mainFile = files.find(file => file.id === data.data.main_contract);
        }

        const network = NetworkApiToAppTypeMap[data.network_id] || data.network_id;

        /**
         * @Notice When ever changing the mapping from response data, be sure to check `examples.js` and adjust them
         * accordingly as those mocked responses are used for the Example Project and might break it.
         */
        return new Contract({
            id: Contract.generateUniqueContractId(data.address, network),
            name: data.contract_name,
            address: data.address,
            network,
            creationTx: data.creation_tx,
            isPublic: data.public,
            createdAt: data.created_at,
            errorCount: data.number_of_exceptions,
            watchCount: data.number_of_watches,
            filesCount: data.number_of_files,
            lastEventAt: data.last_event_occurred_at,
            verifiedAt: data.verification_date,
            verifiedBy: data.verified_by,
            files,
            mainFile,
        }, projectData, parentContract);
    }
}

export default Contract;
