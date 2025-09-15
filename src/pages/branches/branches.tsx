import { useEffect, useMemo, useState } from "react";
import { Table, Modal, Form, Input, Button, Popconfirm, message, Empty, Select } from "antd";
import type { ColumnsType } from "antd/es/table";

const { Option } = Select;

type Shop = {
  id: number;
  name: string;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  user_id: number | null;
};

type User = {
  id: number;
  name: string;
};

const fakeUsers: User[] = [
  { id: 1, name: "User One" },
  { id: 2, name: "User Two" },
];

const initialData: Shop[] = [
  {
    id: 1,
    name: "do'kon 1",
    createdAt: "2025-09-04T10:46:24.844Z",
    updatedAt: "2025-09-04T10:46:24.844Z",
    user_id: 1,
  },
  {
    id: 2,
    name: "do'kon 1",
    createdAt: "2025-09-15T09:33:10.459Z",
    updatedAt: "2025-09-15T09:33:10.459Z",
    user_id: 2,
  },
];

export default function BranchesPage() {
  const [data, setData] = useState<Shop[]>(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("shops_demo_data") : null;
      if (raw) return JSON.parse(raw) as Shop[];
    } catch (e) {}
    return initialData;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Shop | null>(null);
  const [form] = Form.useForm<{ name: string; user_id: number }>();
  const [query, setQuery] = useState("");
  const [isMobile, setIsMobile] = useState<boolean>(typeof window !== "undefined" ? window.innerWidth < 768 : false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") localStorage.setItem("shops_demo_data", JSON.stringify(data));
    } catch (e) {}
  }, [data]);

  const openCreateModal = () => {
    setEditing(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEditModal = (record: Shop) => {
    setEditing(record);
    form.setFieldsValue({ name: record.name, user_id: record.user_id ?? undefined });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(null);
    form.resetFields();
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((p) => p.id !== id));
    message.success("O'chirildi");
  };

  const handleFinish = (values: { name: string; user_id: number }) => {
    const now = new Date().toISOString();
    if (editing) {
      setData((prev) =>
        prev.map((p) => (p.id === editing.id ? { ...p, name: values.name, user_id: values.user_id, updatedAt: now } : p))
      );
      message.success("Yangilandi");
    } else {
      const nextId = Math.max(0, ...data.map((d) => d.id)) + 1;
      const newShop: Shop = {
        id: nextId,
        name: values.name,
        createdAt: now,
        updatedAt: now,
        user_id: values.user_id,
      };
      setData((prev) => [newShop, ...prev]);
      message.success("Yaratildi");
    }

    closeModal();
  };

  const columns: ColumnsType<Shop> = [
    { title: "ID", dataIndex: "id", key: "id", width: 80, sorter: (a, b) => a.id - b.id },
    {
      title: "Nomi",
      dataIndex: "name",
      key: "name",
      render: (text) => <div className="font-medium truncate" title={String(text)}>{text}</div>,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Foydalanuvchi",
      dataIndex: "user_id",
      key: "user_id",
      render: (uid: number | null) => fakeUsers.find((u) => u.id === uid)?.name || "-",
    },
    {
      title: "Yaratilgan",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (t: string) => new Date(t).toLocaleString(),
      responsive: ["md"],
    },
    {
      title: "Oxirgi o'zgartirish",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (t: string) => new Date(t).toLocaleString(),
      responsive: ["lg"],
    },
    {
      title: "Amallar",
      key: "actions",
      width: 180,
      render: (_text, record) => (
        <div className="flex gap-2 items-center">
          <Button type="default" onClick={() => openEditModal(record)}>Tahrirlash</Button>
          <Popconfirm
            title={"Haqiqatan ham o'chirmoqchimisiz?"}
            onConfirm={() => handleDelete(record.id)}
            okText={"Ha"}
            cancelText={"Yo'q"}
          >
            <Button danger>O'chirish</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const filtered = useMemo(() => {
    if (!query.trim()) return data;
    return data.filter((d) => d.name.toLowerCase().includes(query.toLowerCase()));
  }, [data, query]);

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
          <Button type="primary" onClick={openCreateModal} className="whitespace-nowrap">Yangi do'kon +</Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
        {isMobile ? (
          <div className="grid grid-cols-1 gap-4">
            {filtered.length === 0 ? (
              <Empty description={"Ma'lumot topilmadi"} />
            ) : (
              filtered.map((item) => (
                <div key={item.id} className="border p-4 rounded-xl flex justify-between items-start">
                  <div>
                    <div className="text-lg font-semibold">{item.name}</div>
                    <div className="text-xs text-gray-500">ID: {item.id}</div>
                    <div className="text-xs text-gray-400">{new Date(item.updatedAt).toLocaleString()}</div>
                    <div className="text-xs text-gray-600">User: {fakeUsers.find((u) => u.id === item.user_id)?.name || "-"}</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="small" onClick={() => openEditModal(item)}>Tahrirlash</Button>
                    <Popconfirm
                      title={"Haqiqatan ham o'chirmoqchimisiz?"}
                      onConfirm={() => handleDelete(item.id)}
                      okText={"Ha"}
                      cancelText={"Yo'q"}
                    >
                      <Button danger size="small">O'chirish</Button>
                    </Popconfirm>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <Table<Shop>
            columns={columns}
            dataSource={filtered}
            rowKey={(r) => r.id}
            pagination={{ pageSize: 8 }}
            className="border-none"
          />
        )}
      </div>

      <Modal
        title={editing ? "Do'konni tahrirlash" : "Yangi do'kon yaratish"}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        destroyOnHidden={true}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={{ name: "", user_id: undefined }}>
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
              {fakeUsers.map((u) => (
                <Option key={u.id} value={u.id}>{u.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <div className="flex justify-end gap-2">
            <Button onClick={closeModal}>Bekor qilish</Button>
            <Button type="primary" htmlType="submit">{editing ? "Saqlash" : "Yaratish"}</Button>
          </div>
        </Form>
      </Modal>

      <div className="mt-6 text-xs text-gray-400">Ko'rsatkichlar faqat client tomonda saqlanadi (localStorage). Backend bilan integratsiya qilish uchun endpointlarni qo'shib beraman.</div>
    </div>
  );
}
