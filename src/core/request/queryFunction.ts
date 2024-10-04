import type {
	MutationFunction,
	QueryClient,
	QueryFunction,
	QueryKey,
} from "@tanstack/query-core";

export const createQueryFunctions = (queryClient: QueryClient) => {
	const fetchQuery = async <T>(
		queryKey: QueryKey,
		queryFn: QueryFunction<T>,
	): Promise<T> => {
		return queryClient.fetchQuery<T>({
			queryKey,
			queryFn,
		});
	};

	const executeMutation = <T, TVariables>(
		mutationFn: MutationFunction<T, TVariables>,
	): ((variables: TVariables) => Promise<T>) => {
		return async (variables: TVariables): Promise<T> => {
			try {
				return await mutationFn(variables);
			} catch (error) {
				throw new Error(`Mutation failed: ${error}`);
			}
		};
	};

	return { fetchQuery, executeMutation };
};
