import { Button, Form, Input, Modal, Select } from 'antd'
import { Database } from 'lucide-react'
import React from 'react'
import type { UserType } from '../../types';

const { Option } = Select;

interface BranchModalProps {
  isModalVisible: boolean;
  editingBranch: any;
  toggleModalVisible: () => void;
  form: any;
  handleSubmit: (values: any) => void;
  users: UserType[] | undefined;
}

const BranchModal:React.FC<BranchModalProps> = ({editingBranch, isModalVisible, toggleModalVisible, form, handleSubmit, users}) => {
  return (
    <Modal
      title={
        <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
          <Database className="w-5 h-5 text-purple-500" />
          <span className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {editingBranch ? "Ma'lumotlarini o'zgartrish" : "Yangi do'kon qo'shish"}
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
            {editingBranch ? "Yangilash" : "Yaratish"}
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default BranchModal
