import ActionResponse from "./ActionResponse.model";

export default class SuccessActionResponse extends ActionResponse {
    /**
     * @param {*} [data]
     */
    constructor(data) {
        super(true, data);
    }
}
