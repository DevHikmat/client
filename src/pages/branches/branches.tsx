import { useState } from "react";
import { Table, Form, Input, Button, Popconfirm, message, Empty } from "antd";
import { Edit, Trash2, Plus } from "lucide-react";
import { useGetBranches } from "../../hooks/useGetBranches";
import type { BranchType } from "../../types";
import { useGetUsers } from "../../hooks/useGetUsers";
import { useCreateBranch } from "../../hooks/useCreateBranch";
import { useUpdateBranch } from "../../hooks/useUpdateBranch";
import { useDeleteBranch } from "../../hooks/useDeleteBranch";
import { getBranchColumns } from "./getBranchColumns";
import BranchModal from "./BranchModal";
import ContentHeader from "../../components/content-header/content-header";
import CustomTable from "../../components/custom-table/custom-table";

export default function BranchesPage() {
  const createShop = useCreateBranch();
  const updateShop = useUpdateBranch();
  const deleteShop = useDeleteBranch();
  const { data: users } = useGetUsers();
  const { data: branches, isLoading } = useGetBranches();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingBranch, setEditingBranch] = useState<BranchType | null>(null);
  const [form] = Form.useForm<{ name: string; user_id: number }>();

  const handleAdd = () => {
    setEditingBranch(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: BranchType) => {
    setEditingBranch(record);
    form.setFieldsValue({
      name: record.name,
      user_id: record.user_id ?? undefined,
    });
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setEditingBranch(null);
    form.resetFields();
  };

  const handleDelete = (id: number) => {
    deleteShop.mutate(id);
    message.success("O'chirildi");
  };

  const handleSubmit = (values: { name: string; user_id: number }) => {
    if (editingBranch) {
      updateShop.mutate({ id: editingBranch.id, ...values });
      message.success("Yangilandi");
    } else {
      createShop.mutate(values);
      message.success("Yaratildi");
    }
    closeModal();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <ContentHeader
        title="Do'konlar"
        buttonText="Do'kon qo'shish"
        handleAdd={handleAdd}
      />

      <CustomTable
        className="shadow-lg border-t-2 border-t-purple-400"
        loading={isLoading}
        dataSource={users}
        rowKey="id"
        columns={getBranchColumns({ handleEdit, handleDelete, users })}
      />

      <BranchModal
        isModalVisible={isModalVisible}
        toggleModalVisible={() => setIsModalVisible(!isModalVisible)}
        editingBranch={editingBranch}
        form={form}
        handleSubmit={handleSubmit}
        users={users}
      />
    </div>
  );
}
