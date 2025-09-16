import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { BranchType } from "../types";
import { BranchService } from "../services/branch.service";

export interface UpdateBranchPayload {
  id: number;
  name: string;
  user_id: number;
}

export const useUpdateBranch = () => {
  const queryClient = useQueryClient();

  return useMutation<BranchType, Error, UpdateBranchPayload>({
    mutationFn: async ({id, user_id, name}) => BranchService.update(id, {user_id, name}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["branches"] });
    },
  });
};
