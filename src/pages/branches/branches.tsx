import { useEffect, useState } from "react";
import {
  Table,
  Modal,
  Form,
  Input,
  Button,
  Popconfirm,
  message,
  Empty,
  Select,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { useGetBranches } from "../../hooks/useGetBranches";
import type { BranchType } from "../../types";
import { useGetUsers } from "../../hooks/useGetUsers";
import dayjs from "dayjs";
import { useCreateBranch } from "../../hooks/useCreateBranch";
import { useUpdateBranch } from "../../hooks/useUpdateBranch";
import { useDeleteBranch } from "../../hooks/useDeleteBranch";

const { Option } = Select;

export default function BranchesPage() {
  const createShop = useCreateBranch();
  const updateShop = useUpdateBranch();
  const deleteShop = useDeleteBranch();
  const { data:users } = useGetUsers();
  const { data } = useGetBranches();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editing, setEditing] = useState<BranchType | null>(null);
  const [viewing, setViewing] = useState<BranchType | null>(null);
  const [form] = Form.useForm<{ name: string; user_id: number }>();
  const [query, setQuery] = useState("");
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const openCreateModal = () => {
    setEditing(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEditModal = (record: BranchType) => {
    setEditing(record);
    form.setFieldsValue({
      name: record.name,
      user_id: record.user_id ?? undefined,
    });
    setIsModalOpen(true);
  };

  const openViewModal = (record: BranchType) => {
    setViewing(record);
    setIsViewModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(null);
    form.resetFields();
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewing(null);
  };

  const handleDelete = (id: number) => {
    deleteShop.mutate(id);
    message.success("O'chirildi");
  };

  const handleFinish = (values: { name: string; user_id: number }) => {
    if (editing) {
      updateShop.mutate({ id: editing.id, ...values});
      message.success("Yangilandi");
    } else {
      createShop.mutate(values);
      message.success("Yaratildi");
    }
    closeModal();
  };

  const columns: ColumnsType<BranchType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Nomi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Foydalanuvchi",
      dataIndex: "user_id",
      key: "user_id",
      render: (record) => users?.find(u => u.id == record)?.fullname || "-",
    },
    {
      title: "Yaratilgan",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (record) => dayjs(record).format("D MMM, YY | HH:mm"),
      responsive: ["md"],
    },
    {
      title: "Oxirgi o'zgartirish",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (record) => dayjs(record).format("D MMM, YY | HH:mm"),
      responsive: ["lg"],
    },
    {
      title: "Amallar",
      key: "actions",
      width: 200,
      render: (_text, record) => (
        <div className="flex gap-2 items-center">
          <Button
            icon={<Eye size={16} />}
            onClick={() => openViewModal(record)}
          />
          <Button
            icon={<Edit size={16} />}
            onClick={() => openEditModal(record)}
          />
          <Popconfirm
            title={"Haqiqatan ham o'chirmoqchimisiz?"}
            onConfirm={() => handleDelete(record.id)}
            okText={"Ha"}
            cancelText={"Yo'q"}
          >
            <Button danger icon={<Trash2 size={16} />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold">Do'konlar</h1>
        </div>

        <div className="flex w-full md:w-auto gap-2">
          <Input
            placeholder="Qidirish..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-lg"
            allowClear
          />
          <Button
            type="primary"
            onClick={openCreateModal}
            className="whitespace-nowrap flex items-center gap-1"
          >
            <Plus size={16} /> Yangi do'kon
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
        {isMobile ? (
          <div className="grid grid-cols-1 gap-4">
            {users?.length === 0 ? (
              <Empty description={"Ma'lumot topilmadi"} />
            ) : (
              data?.map((item) => (
                <div key={item.id} className="border p-4 rounded-xl flex justify-between items-start">
                  <div>
                    <div className="text-lg font-semibold">{item.name}</div>
                    <div className="text-xs text-gray-500">ID: {item.id}</div>
                    <div className="text-xs text-gray-400">{new Date(item.updatedAt).toLocaleString()}</div>
                    <div className="text-xs text-gray-600">User: {users?.find((u) => u.id === item.user_id)?.fullname || "-"}</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="small" icon={<Eye size={14} />} onClick={() => openViewModal(item)} />
                    <Button size="small" icon={<Edit size={14} />} onClick={() => openEditModal(item)} />
                    <Popconfirm
                      title={"Haqiqatan ham o'chirmoqchimisiz?"}
                      onConfirm={() => handleDelete(item.id)}
                      okText={"Ha"}
                      cancelText={"Yo'q"}
                    >
                      <Button danger size="small" icon={<Trash2 size={14} />} />
                    </Popconfirm>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <Table<BranchType>
            columns={columns}
            dataSource={data}
            rowKey={(r) => r.id}
            pagination={{ pageSize: 8 }}
            className="border-none"
          />
        )}
      </div>

      {/* Create / Edit Modal */}
      <Modal
        title={editing ? "Do'konni tahrirlash" : "Yangi do'kon yaratish"}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        destroyOnHidden={true}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{ name: "", user_id: undefined }}
        >
          <Form.Item
            name="name"
            label="Do'kon nomi"
            rules={[
              { required: true, message: "Iltimos nomini kiriting" },
              { min: 2, message: "Kamida 2 ta belgidan iborat bo'lsin" },
            ]}
          >
            <Input placeholder="Masalan: Do'kon 1" />
          </Form.Item>

          <Form.Item
            name="user_id"
            label="Foydalanuvchi"
            rules={[{ required: true, message: "Foydalanuvchini tanlang" }]}
          >
            <Select placeholder="Foydalanuvchini tanlang">
              {users?.map((u) => (
                <Option key={u.id} value={u.id}>
                  {u.fullname}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <div className="flex justify-end gap-2">
            <Button onClick={closeModal}>Bekor qilish</Button>
            <Button type="primary" htmlType="submit">
              {editing ? "Saqlash" : "Yaratish"}
            </Button>
          </div>
        </Form>
      </Modal>

      {/* View Modal */}
      <Modal
        title="Do'kon tafsilotlari"
        open={isViewModalOpen}
        onCancel={closeViewModal}
        footer={<Button onClick={closeViewModal}>Yopish</Button>}
      >
        {viewing && (
          <div className="space-y-2">
            <p>
              <strong>ID:</strong> {viewing.id}
            </p>
            <p>
              <strong>Nomi:</strong> {viewing.name}
            </p>
            <p>
              <strong>Foydalanuvchi:</strong>{" "}
              {users?.find((u) => u.id === viewing.user_id)?.fullname || "-"}
            </p>
            <p>
              <strong>Yaratilgan:</strong>{" "}
              {new Date(viewing.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Oxirgi o'zgartirish:</strong>{" "}
              {new Date(viewing.updatedAt).toLocaleString()}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
