import React, { useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import dayjs from "dayjs";
import {
  Eye,
  Pencil,
  Trash2,
  PlusCircle,
} from "lucide-react";

interface User {
  id: number;
  fullname: string;
  username: string;
  password: string;
  phone1: string;
  phone2?: string;
  createdAt: string;
  updatedAt: string;
}

const initialData: User[] = [
  {
    id: 1,
    fullname: "John Doe",
    username: "johndoe",
    password: "123456",
    phone1: "+998901112233",
    phone2: "+998935556677",
    createdAt: dayjs().subtract(2, "day").format("YYYY-MM-DD HH:mm"),
    updatedAt: dayjs().format("YYYY-MM-DD HH:mm"),
  },
  {
    id: 2,
    fullname: "Jane Smith",
    username: "janesmith",
    password: "abcdef",
    phone1: "+998907778899",
    createdAt: dayjs().subtract(5, "day").format("YYYY-MM-DD HH:mm"),
    updatedAt: dayjs().format("YYYY-MM-DD HH:mm"),
  },
];

const UsersCrud: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm<User>();

  const handleAdd = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: User) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleView = (record: User) => {
    Modal.info({
      title: "User Details",
      content: (
        <div className="space-y-2">
          <p><b>Fullname:</b> {record.fullname}</p>
          <p><b>Username:</b> {record.username}</p>
          <p><b>Phone 1:</b> {record.phone1}</p>
          <p><b>Phone 2:</b> {record.phone2 || "-"}</p>
          <p><b>Created At:</b> {record.createdAt}</p>
          <p><b>Updated At:</b> {record.updatedAt}</p>
        </div>
      ),
    });
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (editingUser) {
        setUsers(
          users.map((u) =>
            u.id === editingUser.id
              ? { ...values, id: u.id, createdAt: u.createdAt, updatedAt: dayjs().format("YYYY-MM-DD HH:mm") }
              : u
          )
        );
      } else {
        const newUser: User = {
          ...values,
          id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
          createdAt: dayjs().format("YYYY-MM-DD HH:mm"),
          updatedAt: dayjs().format("YYYY-MM-DD HH:mm"),
        };
        setUsers([...users, newUser]);
      }
      setIsModalOpen(false);
      form.resetFields();
    });
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", responsive: ["md"] },
    { title: "Fullname", dataIndex: "fullname", key: "fullname" },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Phone 1", dataIndex: "phone1", key: "phone1", responsive: ["sm"] },
    { title: "Phone 2", dataIndex: "phone2", key: "phone2", responsive: ["lg"] },
    { title: "Created At", dataIndex: "createdAt", key: "createdAt", responsive: ["lg"] },
    { title: "Updated At", dataIndex: "updatedAt", key: "updatedAt", responsive: ["lg"] },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: User) => (
        <div className="flex gap-2 justify-center">
          <Button type="text" className="!text-blue-500 hover:!bg-blue-50" icon={<Eye size={18} />} onClick={() => handleView(record)} />
          <Button type="text" className="!text-green-500 hover:!bg-green-50" icon={<Pencil size={18} />} onClick={() => handleEdit(record)} />
          <Button type="text" danger className="hover:!bg-red-50" icon={<Trash2 size={18} />} onClick={() => handleDelete(record.id)} />
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-3">
        <h2 className="text-xl font-bold text-gray-700">Users Management</h2>
        <Button type="primary" className="bg-blue-600 hover:!bg-blue-700" icon={<PlusCircle size={18} />} onClick={handleAdd}>
          Add User
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table
          rowKey="id"
          dataSource={users}
          columns={columns}
          pagination={{ pageSize: 5 }}
          className="min-w-[300px]"
        />
      </div>

      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
        okButtonProps={{ className: "bg-blue-600 hover:!bg-blue-700" }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="fullname" label="Fullname" rules={[{ required: true, message: "Fullname is required" }]}>
            <Input placeholder="Enter fullname" className="rounded-lg" />
          </Form.Item>
          <Form.Item name="username" label="Username" rules={[{ required: true, message: "Username is required" }]}>
            <Input placeholder="Enter username" className="rounded-lg" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: "Password is required" }]}>
            <Input.Password placeholder="Enter password" className="rounded-lg" />
          </Form.Item>
          <Form.Item name="phone1" label="Phone 1" rules={[{ required: true, message: "Phone number is required" }]}>
            <Input placeholder="Enter phone number" className="rounded-lg" />
          </Form.Item>
          <Form.Item name="phone2" label="Phone 2">
            <Input placeholder="Enter secondary phone (optional)" className="rounded-lg" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersCrud;
