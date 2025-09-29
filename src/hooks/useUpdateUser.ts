import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserType } from "../types";
import { UserService } from "../services/user.service";

export interface UpdateUserPayload {
  id: number;
  fullname: string;
  username: string;
  email: string;
  phone1: string;
  phone2: string | undefined;
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<UserType, Error, UpdateUserPayload>({
    mutationFn: async ({id, fullname, username, phone1, phone2 }) => UserService.update(id, { fullname, username, phone1, phone2}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
