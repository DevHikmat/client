import React, { useState } from "react";
import { Form, message } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import UserModal from "./UserModal";
import ContentHeader from "../../components/content-header/content-header";
import { useGetUsers } from "../../hooks/useGetUsers";
import { getUserColumns } from "./getUserColumns";
import CustomTable from "../../components/custom-table/custom-table";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { useCreateUser } from "../../hooks/useCreateUser";
import { useDeleteUser } from "../../hooks/useDeleteUser";

dayjs.extend(relativeTime);

const Users: React.FC = () => {
  const { data: users, isLoading } = useGetUsers();
  const updateMutation = useUpdateUser();
  const createMutation = useCreateUser();
  const deleteUser = useDeleteUser();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [form] = Form.useForm();

  const handleAdd = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: any) => {
    setEditingUser(record);
    form.setFieldsValue({
      fullname: record.fullname,
      username: record.username,
      email: record.email,
      phone1: record.phone1,
      phone2: record.phone2,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    try {
      deleteUser.mutate(id);
      message.success("User deleted successfully!");
    } catch (error) {
      message.error("Failed to delete user");
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (editingUser) {
        updateMutation.mutate(editingUser);
        message.success("User updated successfully!");
      } else {
        createMutation.mutate(values);
        message.success("User created successfully!");
      }

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Failed to save user");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <ContentHeader
        title="Rahbarlarni Boshqarish"
        buttonText="Rahbar qo'shish"
        handleAdd={handleAdd}
      />

      <CustomTable
        className="shadow-lg border-t-2 border-t-purple-400"
        loading={isLoading}
        dataSource={users}
        rowKey="id"
        columns={getUserColumns({ handleEdit, handleDelete })}
      />

      <UserModal
        editingUser={editingUser}
        isModalVisible={isModalVisible}
        handleSubmit={handleSubmit}
        toggleModalVisible={() => setIsModalVisible(!isModalVisible)}
        form={form}
      />
    </div>
  );
};

export default Users;
