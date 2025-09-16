export interface BranchType {
  id: number;
  name: string;
  user_id: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface ClientType {
  id: number;
  fullname: string;
  phone1: string;
  phone2: string | null;
  balance: number | string;
  branch_id: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface ExpenseType {
  id: number;
  price: string | number;
  description: string;
  branch_id: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface OrderType {
  id: number;
  client_id: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface OrderItemType {
  id: number;
  amount: string | number;
  price: string | number;
  product_id: number;
  order_id: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface ProductType {
  id: number;
  name: string;
  selling_price: string | number;
  amount: number | string;
  type: "kg" | "unit";
  branch_id: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface ProductHistoryType {
  id: number;
  buying_price: string | number;
  amount: string | number;
  product_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserType {
  id: number;
  fullname: string;
  username: string;
  password: string;
  phone1: string;
  phone2: string | null;
  role: "ADMIN" | "SUPER_ADMIN";
  createdAt: Date;
  updatedAt: Date;
}
