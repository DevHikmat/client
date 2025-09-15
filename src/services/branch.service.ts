import api from "./instance"

export const BranchService = {
    async getAll() {
        const res = await api.get("/branches");
        return res.data;
    }
}