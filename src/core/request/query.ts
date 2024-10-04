import { type DefaultOptions, QueryClient } from "@tanstack/query-core";
import { createQueryFunctions } from "./queryFunction.js";
import { apiDelete, apiGet, apiPost, apiPut } from "./queryHelpers.js";

const defaultOptions: DefaultOptions = {
	queries: {
		retry: 1,
		staleTime: 5 * 60 * 1000,
	},
};

const queryClient = new QueryClient({ defaultOptions });

const { fetchQuery, executeMutation } = createQueryFunctions(queryClient);

export const Query = {
	fetchQuery,
	executeMutation,
	apiGet,
	apiPost,
	apiPut,
	apiDelete,
};
