import { useQuery } from "@tanstack/react-query";
import type { UserType } from "../types";
import { UserService } from "../services/user.service";

export function useGetUsers() {
  return useQuery<UserType[], Error>({
    queryKey: ["users"],
    queryFn: UserService.getAll,
  });
}