import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5255/api/"
});

instance.interceptors.request.use(
    async (config) => {
        // eslint-disable-next-line no-param-reassign

        // const token = store.getState()?.auth?.token;
        // config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    function (error) {
        throw error;
    }
);

export default instance;