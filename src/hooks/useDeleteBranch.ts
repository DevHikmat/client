import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BranchService } from "../services/branch.service";

export const useDeleteBranch = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      await BranchService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["branches"] });
    },
  });
};
