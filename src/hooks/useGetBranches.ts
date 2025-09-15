import { useQuery } from "@tanstack/react-query";
import type { BranchType } from "../types";
import { BranchService } from "../services/branch.service";

export function useGetBranches() {
  return useQuery<BranchType[], Error>({
    queryKey: ["branches"],
    queryFn: BranchService.getAll,
  });
}