import api from "./instance";

export const BranchService = {
  async getAll() {
    const res = await api.get("/branches");
    return res.data.data;
  },
  async create(branch: any) {
    const res = await api.post("/branches", branch);
    return res.data.data;
  },
  async update(id: number, payload: { name: string; user_id: number }) {
    const { data } = await api.put(`/branches/${id}`, payload);
    return data;
  },
  async delete(id: number) {
    await api.delete(`/branches/${id}`);
  },
};
