import axios from "axios";

export const Api = axios.create({
    baseURL: 'https://api.tenderly.love/api/v1',
});

export const PublicApi = axios.create({
    baseURL: 'https://api.tenderly.love',
});
