class SearchResult {
    constructor(data) {
    }

    /**
     * @param {Object} response
     * @returns {SearchResult}
     */
    static buildFromResponse(response) {
        return new SearchResult({});
    }
}

export default SearchResult;
