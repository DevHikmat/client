import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { BranchType } from "../types";
import { BranchService } from "../services/branch.service";

export interface CreateShopPayload {
  name: string;
  user_id: number;
}

export const useCreateBranch = () => {
  const queryClient = useQueryClient();
  return useMutation<BranchType, Error, CreateShopPayload>({
    mutationFn: async (payload) => BranchService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["branches"] });
    },
  });
};
