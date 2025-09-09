import api from "../lib/api";

export const login = async (username: string, password: string) => {
  const res = await api.post("/auth/login", { username, password });
  if (res.data?.token) {
    localStorage.setItem("accessToken", res.data.token);
  }
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  window.location.href = "/login";
};
