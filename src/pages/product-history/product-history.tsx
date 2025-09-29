import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Tooltip,
  message,
  Popconfirm,
  Card,
} from "antd";
import {
  UserPlus,
  CreditCard as Edit3,
  Trash,
  Search,
  Database,
  Edit,
} from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const ProductHistoryPage: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Mock data - in real app this would come from API
  useEffect(() => {
    const mockUsers = [
      {
        id: "1",
        fullname: "John Michael Doe",
        username: "johndoe",
        email: "john.doe@company.com",
        phone1: "+1-555-0123",
        phone2: "+1-555-0124",
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-20T14:22:00Z",
      },
      {
        id: "2",
        fullname: "Sarah Elizabeth Johnson",
        username: "sarahj",
        email: "sarah.johnson@company.com",
        phone1: "+1-555-0125",
        phone2: "+1-555-0126",
        createdAt: "2024-01-10T08:15:00Z",
        updatedAt: "2024-01-18T16:45:00Z",
      },
      {
        id: "3",
        fullname: "Michael Chen Wang",
        username: "mikecw",
        email: "mike.chen@company.com",
        phone1: "+1-555-0127",
        phone2: "+1-555-0128",
        createdAt: "2024-01-05T12:00:00Z",
        updatedAt: "2024-01-12T09:30:00Z",
      },
    ];
    setUsers(mockUsers);
  }, []);

  const handleAdd = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
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

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUsers(users.filter((user) => user.id !== id));
      message.success("User deleted successfully!");
    } catch (error) {
      message.error("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (editingUser) {
        // Update existing user
        const updatedUsers = users.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                ...values,
                updatedAt: dayjs().toISOString(),
              }
            : user
        );
        setUsers(updatedUsers);
        message.success("User updated successfully!");
      } else {
        // Add new user
        const newUser: User = {
          id: Date.now().toString(),
          ...values,
          createdAt: dayjs().toISOString(),
          updatedAt: dayjs().toISOString(),
        };
        setUsers([...users, newUser]);
        message.success("User created successfully!");
      }

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Failed to save user");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.fullname.toLowerCase().includes(searchText.toLowerCase()) ||
      user.username.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.phone1.toLowerCase().includes(searchText.toLowerCase()) ||
      user.phone2.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
      render: (text: string) => (
        <div className="font-medium text-gray-900">{text}</div>
      ),
      sorter: (a, b) => a.fullname.localeCompare(b.fullname),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text: string) => (
        <div className="text-purple-600 font-mono text-sm bg-purple-50 px-2 py-1 rounded-md inline-block">
          @{text}
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: string) => (
        <div className="text-emerald-600 hover:text-emerald-800 transition-colors cursor-pointer">
          {text}
        </div>
      ),
    },
    {
      title: "Phone 1",
      dataIndex: "phone1",
      key: "phone1",
      render: (text: string) => (
        <div className="text-gray-600 font-mono text-sm">{text}</div>
      ),
    },
    {
      title: "Phone 2",
      dataIndex: "phone2",
      key: "phone2",
      render: (text: string) => (
        <div className="text-gray-600 font-mono text-sm">{text}</div>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => (
        <Tooltip title={dayjs(date).format("YYYY-MM-DD HH:mm:ss")}>
          <div className="text-gray-500 text-sm">{dayjs(date).fromNow()}</div>
        </Tooltip>
      ),
      sorter: (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string) => (
        <Tooltip title={dayjs(date).format("YYYY-MM-DD HH:mm:ss")}>
          <div className="text-gray-500 text-sm">{dayjs(date).fromNow()}</div>
        </Tooltip>
      ),
      sorter: (a, b) => dayjs(a.updatedAt).unix() - dayjs(b.updatedAt).unix(),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Edit User">
            <Button
              type="text"
              size="small"
              icon={<Edit className="w-4 h-4" />}
              onClick={() => handleEdit(record)}
              className="hover:bg-amber-50 hover:text-amber-600 transition-colors rounded-lg"
            />
          </Tooltip>
          <Popconfirm
            title="Delete User"
            description="Are you sure ?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Delete User">
              <Button
                type="text"
                size="small"
                danger
                icon={<Trash className="w-4 h-4" />}
                className="hover:bg-red-50 transition-colors rounded-lg"
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        {/* Controls */}
        <Card className="mb-6 shadow-lg border-0 rounded-xl bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 max-w-md">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-lg">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    User Management
                  </h1>
                </div>
                <p className="text-gray-600">
                  Manage user accounts and contact information
                </p>
            </div>
            <Button
              icon={<UserPlus className="w-4 h-4" />}
              onClick={handleAdd}
              size="large"
              className="!bg-gradient-to-r from-purple-500 to-indigo-600 !text-white border-0 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Add User
            </Button>
          </div>
        </Card>

        {/* Table */}
        <Card className="shadow-lg border-0 rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm">
          <Table
            columns={columns}
            dataSource={filteredUsers}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} users`,
              className: "px-6 py-4",
            }}
            className="custom-table"
            scroll={{ x: 1000 }}
          />
        </Card>

        {/* Modal */}
        <Modal
          title={
            <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
              <Database className="w-5 h-5 text-purple-500" />
              <span className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {editingUser ? "Edit User" : "Add New User"}
              </span>
            </div>
          }
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={700}
          className="custom-modal"
          destroyOnClose
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="pt-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="fullname"
                label="Full Name"
                rules={[
                  { required: true, message: "Please enter the full name" },
                  { min: 2, message: "Name must be at least 2 characters" },
                ]}
              >
                <Input
                  placeholder="Enter full name"
                  className="rounded-lg"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="username"
                label="Username"
                rules={[
                  { required: true, message: "Please enter the username" },
                  { min: 3, message: "Username must be at least 3 characters" },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message:
                      "Username can only contain letters, numbers, and underscores",
                  },
                ]}
              >
                <Input
                  placeholder="Enter username"
                  className="rounded-lg"
                  size="large"
                  prefix="@"
                />
              </Form.Item>
            </div>

            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: "Please enter the email address" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                placeholder="Enter email address"
                className="rounded-lg"
                size="large"
              />
            </Form.Item>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="phone1"
                label="Primary Phone"
                rules={[
                  {
                    required: true,
                    message: "Please enter the primary phone number",
                  },
                  {
                    pattern: /^[\+]?[1-9][\d]{0,15}$/,
                    message: "Please enter a valid phone number",
                  },
                ]}
              >
                <Input
                  placeholder="Enter primary phone"
                  className="rounded-lg"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="phone2"
                label="Secondary Phone"
                rules={[
                  {
                    required: true,
                    message: "Please enter the secondary phone number",
                  },
                  {
                    pattern: /^[\+]?[1-9][\d]{0,15}$/,
                    message: "Please enter a valid phone number",
                  },
                ]}
              >
                <Input
                  placeholder="Enter secondary phone"
                  className="rounded-lg"
                  size="large"
                />
              </Form.Item>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
              <Button
                onClick={() => setIsModalVisible(false)}
                size="large"
                className="rounded-lg font-medium"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 border-0 rounded-lg font-medium shadow-lg"
              >
                {editingUser ? "Update User" : "Create User"}
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default ProductHistoryPage;
