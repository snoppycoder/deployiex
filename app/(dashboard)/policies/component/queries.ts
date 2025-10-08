import { categoryControllerFindAllByOrganization } from "@/app/api/gen";
import { useQuery } from "@tanstack/react-query";
import { CategoryType } from "./types";

export function useCategoryByOrganization(
  organizationId?: string,
  options?: { enabled?: boolean }
) {
  // categoryControllerFindAllByOrganization()
  return useQuery({
    queryKey: ["categoryByOrganization", organizationId],
    queryFn: async () => {
      if (!organizationId) {
        throw Error("UserId is required");
      }
      return (
        await categoryControllerFindAllByOrganization({
          path: { id: organizationId },
        })
      ).data;
    },
    select: (data) => data as unknown as CategoryType[],
    enabled: !!organizationId,
    staleTime: 1000 * 60 * 30,
  });
}
