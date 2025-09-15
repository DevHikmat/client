import { useMutation } from "@tanstack/react-query";
import { login } from "../services/auth.service";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) => login(username, password),
    onSuccess: () => {
      window.location.href = "/";
    },
  });
};
