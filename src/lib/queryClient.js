import { MutationCache, QueryClient, defaultShouldDehydrateQuery, isServer, matchQuery } from "@tanstack/react-query";
import { toast } from "sonner";

function makeQueryClient() {
    let queryClient;

    const mutationCache = new MutationCache({
        onSuccess: (data, variables, context, mutation) => {
            const meta = mutation.meta || {};
            if (meta.successMessage) toast.success("Event has been created");

            // If the mutation has a meta property with skipGlobalInvalidation set to true, skip invalidation
            if (meta.skipGlobalInvalidation) return;

            // If the mutation has a meta property with invalidateKeys, invalidate those specific queries
            if (Array.isArray(meta.invalidateKeys)) {
                return queryClient.invalidateQueries({
                    predicate: (query) => {
                        const shouldInvalidate = meta.invalidateKeys.some((queryKey) => matchQuery({ queryKey }, query));
                        return shouldInvalidate;
                    },
                });
            }

            // Global invalidation with optional exclusion
            return queryClient.invalidateQueries({
                predicate: (query) => {
                    // If excludeKeys is defined, skip any query that matches
                    if (Array.isArray(meta.excludeKeys)) {
                        const isExcluded = meta.excludeKeys.some((excludedKey) => matchQuery({ queryKey: excludedKey }, query));
                        if (isExcluded) return false;
                    }
                    return true; // Invalidate everything else
                },
            });
        },
        onError: (error) => {
            console.error(error);
            if (error.message) {
                toast.error(error.message);
            }
        },
    });

    queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 20 * 1000,
                // throwOnError: true,
            },
            dehydrate: {
                shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === "pending",
            },
        },
        mutationCache,
    });

    return queryClient;
}

let browserQueryClient = undefined;

export function getQueryClient() {
    if (isServer) {
        // Server: always make a new query client
        return makeQueryClient();
    } else {
        // Browser: make a new query client if we don't already have one
        // This is very important, so we don't re-make a new client if React
        // suspends during the initial render. This may not be needed if we
        // have a suspense boundary BELOW the creation of the query client
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}

export const prefetchQuery = async (queryOptions) => {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(queryOptions);
    return queryClient;
};
