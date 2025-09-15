// src/hooks/useAuthQuery.ts
import { useQuery } from "@tanstack/react-query";
import api from "../services/instance"; // axios instance

export const useAuthQuery = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) return null;

      try {
        const res = await api.get("/auth/me"); // instance avtomatik token qo‘shadi
        return res.data;
      } catch (error) {
        return null;
      }
    },
    staleTime: 1000 * 60 * 5, 
  });
};
