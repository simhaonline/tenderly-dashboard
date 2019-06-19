import axios from "axios";
import fetchStreaming from "fetch-streaming";

import {API_BASE_URL} from "../Common/constants";

export const Api = axios.create({
    baseURL: `${API_BASE_URL}/api/v1`,
});

export const PublicApi = axios.create({
    baseURL: `${API_BASE_URL}`,
});

class StreamingApiProvider {
    constructor() {
        /** @type boolean */
        this.authenticationSet = false;

        /** @type ?string */
        this.token = null;
    }

    /**
     * @param {string} url
     * @param {Object} data
     * @param {Function} callback
     * @param {Object} [options]
     * @return {Promise<Object>}
     */
    async post(url, data, callback = () => {}, options = {}) {
        if (!this.authenticationSet) {
            throw new Error(`Authentication method has not been setup. Try using the 'setAuthentication()' method.`)
        }

        const authHeaders = this.getAuthHeaders();

        const response = await fetchStreaming(StreamingApiProvider.getBuiltUrl(url), {
            method: 'POST',
            ...options,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Accept": "application/json",
                ...authHeaders,
                ...options.headers,
            },
        }, stream => {
            if (typeof stream === typeof Object) {
                return stream;
            }

            if (typeof stream === 'string') {
                callback(StreamingApiProvider.parseFullStream(stream));
            }
        });

        return {
            status: response.status,
            data: StreamingApiProvider.parseFullStream(response.body),
        };
    }

    /**
     * @param {string} token
     */
    setAuthentication(token) {
        this.authenticationSet = true;
        this.token = token;
    }

    getAuthHeaders() {
        if (!this.authenticationSet) {
            return {};
        }

        return {
            'Authorization': `Bearer ${this.token}`
        }
    }

    /**
     * @param {string} stream
     * @returns Object[]
     */
    static parseFullStream(stream) {
        return JSON.parse(`[${stream.replace(/}{/g, '},{')}]`);
    }

    /**
     * @param {string} requestUrl
     * @return {string}
     */
    static getBuiltUrl(requestUrl) {
        return `${API_BASE_URL}/api/v1${requestUrl}`;
    }
}

export const StreamingApi = new StreamingApiProvider();
