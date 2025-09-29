import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  History,
  ShoppingCart,
  Wallet,
  Store,
  UserStar,
  Truck,
  LogOut,
} from "lucide-react";
import Sider from "antd/es/layout/Sider";
import { Menu } from "antd";

const menuItems = [
  { key: "1", label: "Dashboard", path: "/", icon: LayoutDashboard },
  { key: "2", label: "Filiallar", path: "/branches", icon: Store },
  { key: "3", label: "Rahbarlar", path: "/users", icon: UserStar },
  { key: "4", label: "Mahsulotlar", path: "/products", icon: Package },
  {
    key: "5",
    label: "Mahsulot Tarixi",
    path: "/product-history",
    icon: History,
  },
  { key: "6", label: "Mijozlar", path: "/clients", icon: Users },
  { key: "7", label: "Buyurtmalar", path: "/orders", icon: ShoppingCart },
  { key: "8", label: "Jo'natmalar", path: "/transfers", icon: Truck },
  { key: "9", label: "Xarajatlar", path: "/expenses", icon: Wallet },
];

type AppSidebarProps = {
  collapsed: boolean;
};

export default function AppSidebar({ collapsed }: AppSidebarProps) {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="sticky top-0 h-screen bg-white">
        <div className="demo-logo-vertical bg-white px-5 py-10">
          <img
            src="https://megaplast.com.co/wp-content/uploads/2023/08/megaplast-logo.png"
            alt="mega plast logo"
          />
        </div>
        <Menu mode="inline" defaultSelectedKeys={["1"]}>
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={<item.icon />}>
              <Link className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent" to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
        <div className="p-4 border-t border-gray-200 absolute bottom-0 right-0 w-full">
          <button
            onClick={() => {
              // logout logic
              console.log("User logged out");
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-gray-100"
          >
            <LogOut size={18} />
            {!collapsed && "Logout"}
          </button>
        </div>
      </div>
    </Sider>
  );
}
