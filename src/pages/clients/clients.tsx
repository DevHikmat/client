import React, { useState } from "react";
import { Table, Button, Form, Input, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface Client {
  id: number;
  fullname: string;
  phone1: string;
  phone2?: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

const initialClients: Client[] = [
  {
    id: 1,
    fullname: "John Doe",
    phone1: "+998901234567",
    phone2: "+998931112233",
    balance: 250,
    createdAt: dayjs().subtract(1, "day").format("YYYY-MM-DD HH:mm"),
    updatedAt: dayjs().format("YYYY-MM-DD HH:mm"),
  },
  {
    id: 2,
    fullname: "Jane Smith",
    phone1: "+998909998877",
    balance: 100,
    createdAt: dayjs().subtract(3, "day").format("YYYY-MM-DD HH:mm"),
    updatedAt: dayjs().format("YYYY-MM-DD HH:mm"),
  },
];

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [form] = Form.useForm<Client>();
  const [search, setSearch] = useState("");
  const [hasPhone2, setHasPhone2] = useState<string | null>(null);

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    form.setFieldsValue(client);
  };

  const handleDelete = (id: number) => {
    setClients(clients.filter((c) => c.id !== id));
  };

  const handleView = (client: Client) => {
    alert(
      `Client Details:\nName: ${client.fullname}\nPhone1: ${client.phone1}\nPhone2: ${client.phone2 || "-"}\nBalance: $${client.balance}\nCreated At: ${client.createdAt}\nUpdated At: ${client.updatedAt}`
    );
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (editingClient) {
        setClients(
          clients.map((c) =>
            c.id === editingClient.id
              ? {
                  ...values,
                  id: c.id,
                  createdAt: c.createdAt,
                  updatedAt: dayjs().format("YYYY-MM-DD HH:mm"),
                }
              : c
          )
        );
        setEditingClient(null);
      } else {
        const newClient: Client = {
          ...values,
          id: clients.length ? Math.max(...clients.map((c) => c.id)) + 1 : 1,
          createdAt: dayjs().format("YYYY-MM-DD HH:mm"),
          updatedAt: dayjs().format("YYYY-MM-DD HH:mm"),
        };
        setClients([...clients, newClient]);
      }
      form.resetFields();
    });
  };

  const filteredClients = clients.filter((c) => {
    const matchesSearch = c.fullname.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      hasPhone2 === "yes"
        ? Boolean(c.phone2)
        : hasPhone2 === "no"
        ? !c.phone2
        : true;
    return matchesSearch && matchesFilter;
  });

  const columns = [
    { title: "Fullname", dataIndex: "fullname", key: "fullname" },
    { title: "Phone 1", dataIndex: "phone1", key: "phone1" },
    { title: "Phone 2", dataIndex: "phone2", key: "phone2", render: (val: string) => val || "-" },
    { title: "Balance", dataIndex: "balance", key: "balance", render: (val: number) => `$${val}` },
    { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
    { title: "Updated At", dataIndex: "updatedAt", key: "updatedAt" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Client) => (
        <div className="flex gap-1">
          <Button
            type="text"
            className="!text-blue-500 hover:!bg-blue-50"
            icon={<Eye size={16} />}
            onClick={() => handleView(record)}
          />
          <Button
            type="text"
            className="!text-green-500 hover:!bg-green-50"
            icon={<Pencil size={16} />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="text"
            danger
            className="hover:!bg-red-50"
            icon={<Trash2 size={16} />}
            onClick={() => handleDelete(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg">
      <h2 className="text-lg font-bold text-gray-700 mb-4">Clients Management</h2>

      {/* Add & Edit Form */}
      <Form form={form} layout="vertical" onFinish={handleSubmit} className="mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 items-end">
          <Form.Item name="fullname" label="Fullname" rules={[{ required: true, message: "Required" }]}>
            <Input placeholder="Fullname" className="rounded-lg" />
          </Form.Item>
          <Form.Item name="phone1" label="Phone 1" rules={[{ required: true, message: "Required" }]}>
            <Input placeholder="+998..." className="rounded-lg" />
          </Form.Item>
          <Form.Item name="phone2" label="Phone 2 (optional)">
            <Input placeholder="+998..." className="rounded-lg" />
          </Form.Item>
          <Form.Item name="balance" label="Balance" rules={[{ required: true, message: "Required" }]}>
            <InputNumber className="w-full rounded-lg" placeholder="Balance" min={0} />
          </Form.Item>
          <div className="sm:col-span-2 md:col-span-4 flex justify-end">
            <Button type="primary" htmlType="submit" className="bg-blue-600 hover:!bg-blue-700">
              {editingClient ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </Form>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto mb-4">
        <Input
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg"
        />
        <Select
          allowClear
          placeholder="Has Phone2?"
          value={hasPhone2 || undefined}
          onChange={(value) => setHasPhone2(value || null)}
          className="min-w-[150px] rounded-lg"
        >
          <Select.Option value="yes">Yes</Select.Option>
          <Select.Option value="no">No</Select.Option>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <Table
          dataSource={filteredClients}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          className="rounded-lg shadow-sm min-w-[600px]"
        />
      </div>
    </div>
  );
};

export default ClientsPage;
