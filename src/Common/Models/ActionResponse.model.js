export default class ActionResponse {
    /**
     * @param {boolean} success
     * @param {*} [data]
     */
    constructor(success, data) {
        /** @type boolean */
        this.success = success;

        /** @type * */
        this.data = data || null;
    }
}
