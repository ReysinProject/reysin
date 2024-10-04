import axios, {
	type AxiosInstance,
	type InternalAxiosRequestConfig,
} from "axios";

let axiosInstance: AxiosInstance;

export const setupAxiosInstance = (baseURL: string): void => {
	axiosInstance = axios.create({ baseURL });

	const addAuthToken = (
		config: InternalAxiosRequestConfig,
	): InternalAxiosRequestConfig => {
		const token = localStorage.getItem("authToken");
		if (token) {
			config.headers = config.headers || {};
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	};

	axiosInstance.interceptors.request.use(addAuthToken);
};

export const getAxiosInstance = (): AxiosInstance => {
	if (!axiosInstance) {
		throw new Error(
			"Axios instance not initialized. Call setupAxiosInstance first.",
		);
	}
	return axiosInstance;
};
