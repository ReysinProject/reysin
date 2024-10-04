import type { MutationFunction, QueryFunction } from "@tanstack/query-core";
import { getAxiosInstance } from "./axiosSetup.js";

export const apiGet = <T>(url: string): QueryFunction<T> => {
	return async () => {
		return await getAxiosInstance().get(url);
	};
};

export const apiPost = <T, U>(url: string): MutationFunction<T, U> => {
	return async (data: U) => {
		return await getAxiosInstance().post(url, data);
	};
};

export const apiPut = <T, U>(url: string): MutationFunction<T, U> => {
	return async (data: U) => {
		return await getAxiosInstance().put(url, data);
	};
};

export const apiDelete = <T>(url: string): MutationFunction<T, void> => {
	return async () => {
		return await getAxiosInstance().delete(url);
	};
};
