class Event {
    constructor(data) {
        this.id = data.ID;
    }
    static responseTransformer(responseData) {
        return new Event(responseData);
    }
}

export default Event;
