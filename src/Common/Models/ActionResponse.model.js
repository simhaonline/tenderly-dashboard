class ActionResponse {
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

class SuccessActionResponse extends ActionResponse {
    /**
     * @param {*} data
     */
    constructor(data) {
        super(true, data);
    }
}

class ErrorActionResponse extends ActionResponse {
    /**
     * @param {*} data
     */
    constructor(data) {
        super(false, data);
    }
}

export default ActionResponse;
