import axios from "axios";

import {API_BASE_URL} from "../Common/constants";

export const Api = axios.create({
    baseURL: `${API_BASE_URL}/api/v1`,
});

export const PublicApi = axios.create({
    baseURL: `${API_BASE_URL}`,
});
