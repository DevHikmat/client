import { Button, Popconfirm, Tooltip, Space } from "antd";
import dayjs from "dayjs";
import { Edit, Trash } from "lucide-react";

interface getUserColumnsProps {
  handleEdit: (user: any) => void;
  handleDelete: (id: any) => void;
}

export const getUserColumns = ({
  handleEdit,
  handleDelete,
}: getUserColumnsProps) => {
  return [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Ism Familya (F.I.O)",
      dataIndex: "fullname",
      key: "fullname",
      render: (text: string) => (
        <div className="font-medium text-gray-900">{text}</div>
      ),
    },
    {
      title: "Login",
      dataIndex: "username",
      key: "username",
      render: (text: string) => (
        <div className="text-purple-600 font-mono text-sm bg-purple-50 px-2 py-1 rounded-md inline-block">
          {text}
        </div>
      ),
    },
    {
      title: "Asosiy Tel",
      dataIndex: "phone1",
      key: "phone1",
      render: (text: string) => (
        <div className="text-gray-600 font-mono text-sm">{text}</div>
      ),
    },
    {
      title: "Qo'shimcha Tel",
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
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_: any, record: any) => (
        <Space size="small">
          <Button
            type="text"
            size="small"
            icon={<Edit className="w-4 h-4" />}
            onClick={() => handleEdit(record)}
            className="hover:bg-amber-50 hover:text-amber-600 transition-colors rounded-lg"
          />
          <Popconfirm
            title="Delete User"
            description="Are you sure ?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button
              type="text"
              size="small"
              danger
              icon={<Trash className="w-4 h-4" />}
              className="hover:bg-red-50 transition-colors rounded-lg"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];
};
