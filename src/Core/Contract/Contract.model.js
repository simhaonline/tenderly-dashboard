import moment from "moment";
import _ from "lodash";

import {AccountTypes, NetworkApiToAppTypeMap} from "../../Common/constants";

import {Account, ContractFile} from "../models";

import {getRouteSlugForNetwork} from "../../Utils/RouterHelpers";

class Contract extends Account {
    /**
     * @param {Object} data
     * @param {object} [projectData]
     * @param {string} [parentContract]
     */
    constructor(data, projectData, parentContract) {
        super(data, AccountTypes.CONTRACT);

        // @TODO Deprecate this in favor of new ProjectContract model
        if (projectData) {
            /** @type Project.id */
            this.projectId = projectData.id;

            /** @type boolean */
            this.listening = projectData.listening;
        }

        // @TODO Deprecate this in favor of the ProjectContract model. Parent contracts are tracked by the new model.
        /** @type string */
        this.parent = parentContract || data.address;

        // @TODO Deprecate this in favor of the ProjectContract model. If it exists then it is public.
        /** @type boolean */
        this.isPublic = !projectData;

        /** @type boolean */
        this.isVerifiedPublic = !!data.isPublic;

        /** @type {string} */
        this.name = data.name;

        /** @type string */
        this.creationTx = data.creationTx;

        /** @type number */
        this.watchCount = data.watchCount;

        // @TODO why is this needed? create a helper function or something
        /** @type number */
        this.filesCount = data.filesCount;

        /** @type ContractFile[] */
        this.files = data.files;

        /** @type ContractFile */
        this.mainFile = data.mainFile;

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

    getUrlBase() {
        const networkRoute = getRouteSlugForNetwork(this.network);

        return `/${networkRoute}/${this.address}`;
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
     * @return {Contract.id}
     */
    getUniqueId() {
        return Contract.generateUniqueId(this.address, this.network);
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
            id: Contract.generateUniqueId(data.address, network),
            name: (projectData && !!projectData.displayName) ? projectData.displayName : data.contract_name,
            address: data.address,
            network,
            creationTx: data.creation_tx,
            isPublic: data.public,
            createdAt: data.created_at,
            watchCount: data.number_of_watches,
            filesCount: data.number_of_files,
            verifiedAt: data.verification_date,
            verifiedBy: data.verified_by,
            files,
            mainFile,
        }, projectData, parentContract);
    }
}

export default Contract;
