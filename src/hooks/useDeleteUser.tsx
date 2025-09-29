import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "../services/user.service";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      await UserService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
