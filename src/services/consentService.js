import axios from 'axios';
import MockAdapter from "axios-mock-adapter";

const mockData = require('./mockData.json');
const mock = new MockAdapter(axios);
const api = axios.create();

mock.onGet("/consents").reply(200, mockData);
mock.onPost("/consents").reply(200, mockData);

const consentService = {
    get: () => api.get("/consents").then(response => response.data).catch(console.error),
    post: data => api.post("/consents").then(response => data).catch(console.error)
}

export default consentService;
