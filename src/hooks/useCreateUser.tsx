import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserType } from "../types";
import { UserService } from "../services/user.service";

export interface CreateUserPayload {
  id: number;
  fullname: string;
  username: string;
  email: string | null;
  phone1: string;
  phone2: string | null;
}

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<UserType, Error, CreateUserPayload>({
    mutationFn: async (payload) => UserService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
