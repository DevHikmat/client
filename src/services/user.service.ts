import type { UserType } from "../types";
import api from "./instance"

export const UserService = {
    async getAll() {
        const res = await api.get("/users");
        return res.data.data;
    },
    async create(user: Partial<UserType>) {
        const res = await api.post(`/users`, user);
        return res.data.data;
    },
    async update(id: number, user: Partial<UserType>) {
        const res = await api.put(`/users/${id}`, user);
        return res.data.data;
    },
    async delete(id: number) {
        const res = await api.delete(`/users/${id}`);
        return res.data.data;
    },
}