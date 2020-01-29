class ContractsPush {
    constructor(data) {
        /** @type {string} */
        this.id = data.id;

        /** @type {Project.id} */
        this.projectId = data.id;

        /** @type {Network.id|PrivateNetwork.id} */
        this.network = data.network;

        /** @type {User} */
        this.pushedBy = data.pushedBy;

        /**
         * List of contract IDs that have been published in this push.
         * @type {Contract.id[]}
         */
        this.contracts = data.contracts;

        /** @type {ProjectTag} */
        this.tag = data.tag;

        /** @type {Date} */
        this.timestamp = data.timestamp;
    }

}

export default ContractsPush;
