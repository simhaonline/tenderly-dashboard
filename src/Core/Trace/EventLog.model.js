import TraceInput from "./TraceInput.model";

class EventLog {
    constructor(data) {
        /** @type string */
        this.name = data.name;

        /** @type boolean */
        this.anonymous = data.anonymous;

        /** @type string */
        this.contract = data.contract;

        /** @type string */
        this.data = data.data;

        /** @type string[] */
        this.topics = data.topics;

        /** @type TraceInput[] */
        this.inputs = data.inputs;
    }

    static buildFromResponse(response) {
        const inputs = response.inputs && response.inputs.map(input => TraceInput.buildFromResponse(input));

        return new EventLog({
            anonymous: response.anonymous,
            name: response.name,
            contract: response.raw && response.raw.address,
            data: response.raw && response.raw.data,
            topics: response.raw && response.raw.topics,
            inputs,
        });
    }
}

export default EventLog;
