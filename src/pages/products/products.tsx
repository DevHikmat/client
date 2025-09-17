import React, { useState } from "react";
import { Table, Button, Form, Input, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface Product {
  id: number;
  name: string;
  selling_price: number;
  type: "kg" | "unit";
  amount: number;
  createdAt: string;
  updatedAt: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Apples",
    selling_price: 3,
    type: "kg",
    amount: 120,
    createdAt: dayjs().subtract(2, "day").format("YYYY-MM-DD HH:mm"),
    updatedAt: dayjs().format("YYYY-MM-DD HH:mm"),
  },
  {
    id: 2,
    name: "Bottled Water",
    selling_price: 1,
    type: "unit",
    amount: 300,
    createdAt: dayjs().subtract(5, "day").format("YYYY-MM-DD HH:mm"),
    updatedAt: dayjs().format("YYYY-MM-DD HH:mm"),
  },
];

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm<Product>();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleView = (product: Product) => {
    alert(`Product Details:\nName: ${product.name}\nPrice: $${product.selling_price}\nType: ${product.type}\nAmount: ${product.amount}\nCreated At: ${product.createdAt}\nUpdated At: ${product.updatedAt}`);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (editingProduct) {
        setProducts(
          products.map((p) =>
            p.id === editingProduct.id
              ? { ...values, id: p.id, createdAt: p.createdAt, updatedAt: dayjs().format("YYYY-MM-DD HH:mm") }
              : p
          )
        );
        setEditingProduct(null);
      } else {
        const newProduct: Product = {
          ...values,
          id: products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1,
          createdAt: dayjs().format("YYYY-MM-DD HH:mm"),
          updatedAt: dayjs().format("YYYY-MM-DD HH:mm"),
        };
        setProducts([...products, newProduct]);
      }
      form.resetFields();
    });
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterType ? p.type === filterType : true;
    return matchesSearch && matchesFilter;
  });

  const columns = [
    { title: "Name", dataIndex: "name", key: "name", responsive: ["xs", "sm", "md"] },
    { title: "Price", dataIndex: "selling_price", key: "selling_price", render: (val: number) => `$${val}`, responsive: ["sm", "md"] },
    { title: "Type", dataIndex: "type", key: "type", responsive: ["sm", "md"] },
    { title: "Amount", dataIndex: "amount", key: "amount", responsive: ["md"] },
    { title: "Created At", dataIndex: "createdAt", key: "createdAt", responsive: ["lg"] },
    { title: "Updated At", dataIndex: "updatedAt", key: "updatedAt", responsive: ["lg"] },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Product) => (
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
    <div className="p-4 sm:p-6 bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-lg">
      <h2 className="text-lg font-bold text-gray-700 mb-4">Products Management</h2>

      {/* Add & Edit Form */}
      <Form form={form} layout="vertical" onFinish={handleSubmit} className="mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 items-end">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Required" }]}>
            <Input placeholder="Product name" className="rounded-lg" />
          </Form.Item>
          <Form.Item name="selling_price" label="Price" rules={[{ required: true, message: "Required" }]}>
            <InputNumber className="w-full rounded-lg" placeholder="Price" min={0} />
          </Form.Item>
          <Form.Item name="type" label="Type" rules={[{ required: true, message: "Required" }]}>
            <Select placeholder="Type">
              <Select.Option value="kg">kg</Select.Option>
              <Select.Option value="unit">unit</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="amount" label="Amount" rules={[{ required: true, message: "Required" }]}>
            <InputNumber className="w-full rounded-lg" placeholder="Amount" min={0} />
          </Form.Item>
          <div className="flex justify-end">
            <Button type="primary" htmlType="submit" className="bg-green-600 hover:!bg-green-700 w-full sm:w-auto">
              {editingProduct ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </Form>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto mb-4">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg"
        />
        <Select
          allowClear
          placeholder="Filter by type"
          value={filterType || undefined}
          onChange={(value) => setFilterType(value || null)}
          className="min-w-[150px] rounded-lg"
        >
          <Select.Option value="kg">kg</Select.Option>
          <Select.Option value="unit">unit</Select.Option>
        </Select>
      </div>

      <Table
        dataSource={filteredProducts}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        className="rounded-lg shadow-sm overflow-x-auto"
      />
    </div>
  );
};

export default ProductsPage;
