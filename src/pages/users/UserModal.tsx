import { Button, Form, Input, Modal } from "antd";
import { Database } from "lucide-react";
import type React from "react";

interface UserModalProps {
  isModalVisible: boolean;
  editingUser: any;
  toggleModalVisible: () => void;
  form: any;
  handleSubmit: (values: any) => void;
}

const UserModal: React.FC<UserModalProps> = ({
  editingUser,
  isModalVisible,
  toggleModalVisible,
  handleSubmit,
  form,
}) => {
  return (
    <Modal
      title={
        <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
          <Database className="w-5 h-5 text-purple-500" />
          <span className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {editingUser ? "Ma'lumotlarini o'zgartrish" : "Yangi rahbar qo'shish"}
          </span>
        </div>
      }
      open={isModalVisible}
      onCancel={toggleModalVisible}
      footer={null}
      width={700}
      className="custom-modal"
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="pt-6"
      >
        <Form.Item
          name="fullname"
          label="Ism va familya"
          rules={[
            { required: true, message: "Ism familyani kiriting" },
            { min: 4, message: "Kamida 4 ta belgi bo'lishi kerak" },
          ]}
        >
          <Input
            placeholder="F.I.O"
            className="rounded-lg"
            size="large"
          />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="username"
            label="Login"
            rules={[
              { required: true, message: "Login majburiy" },
            ]}
          >
            <Input
              placeholder="Login kiriting"
              className="rounded-lg"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Parol"
            rules={[
              {required: true, message: "parol majburiy"},
            ]}
          >
            <Input.Password
              placeholder="Parol kiriting"
              className="rounded-lg"
              size="large"
            />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="phone1"
            label="Asosiy telefon"
            rules={[
              {
                required: true,
                message: "Telefon majburiy",
              },
            ]}
          >
            <Input
              placeholder="+998991234567"
              className="rounded-lg"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="phone2"
            label="Qo'shimcha telefon"
          >
            <Input
              placeholder="+998991234567"
              className="rounded-lg"
              size="large"
            />
          </Form.Item>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
          <Button
            onClick={toggleModalVisible}
            size="large"
            className="rounded-lg font-medium"
          >
            Bekor qilish
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="!bg-gradient-to-r from-purple-500 to-indigo-600 !text-white border-0 rounded-lg font-medium shadow-lg"
          >
            {editingUser ? "Yangilash" : "Yaratish"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UserModal;
