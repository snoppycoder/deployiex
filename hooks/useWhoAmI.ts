import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/providers/QueryClientProvider";
import { userControllerGetCurrentUser } from "@/app/api/gen/sdk.gen";

export const WHOAMI_QUERY_KEY = "whoami" as const;

async function whoamiFn() {
  const { data, error } = await userControllerGetCurrentUser({});
  if (error) {
    return Promise.reject(error);
  }
  return data;
}

export function useWhoAmI() {
  return useQuery({
    queryKey: [WHOAMI_QUERY_KEY],
    queryFn: whoamiFn,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    meta: { persist: false },
  });
}

export async function prefetchWhoAmI() {
  return queryClient.prefetchQuery({
    queryKey: [WHOAMI_QUERY_KEY],
    queryFn: whoamiFn,
    staleTime: 5 * 60 * 1000,
    meta: { persist: false },
  });
}

export function getWhoAmIFromCache<T = unknown>() {
  return queryClient.getQueryData<T>([WHOAMI_QUERY_KEY]);
}
