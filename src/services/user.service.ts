import api from "./instance"

export const UserService = {
    async getAll() {
        const res = await api.get("/users");
        return res.data.data;
    }
}