import { apiClient } from "./ApiClient";

export const retrieveHelloWorldBean = () => apiClient.get('/hello-world-bean');

export const retrieveHelloWorldWithPV = (username) => apiClient.get(`/hello-world/path-variable/${username}`);

export const basicAuthApiService = (token) => apiClient.get('/basicAuth', {
    headers: {
        Authorization: token
    }
}) 