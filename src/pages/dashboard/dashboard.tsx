import { useState } from "react";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  GitBranch,
  Package,
  History,
  UserCircle2,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import "./Dashboard.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import BranchesPage from "../branches/branches";

const menuItems = [
  { name: "asosiy", icon: LayoutDashboard },
  { name: "statistika", icon: BarChart3 },
  { name: "foydalanuvchilar", icon: Users },
  { name: "filiallar", icon: GitBranch },
  { name: "mahsulotlar", icon: Package },
  { name: "tarix", icon: History },
  { name: "mijozlar", icon: UserCircle2 },
  { name: "sozlamalar", icon: Settings },
];

const DashboardPage = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-container">
      {/* Mobile Header */}
      <header className="mobile-header">
        <button
          className="menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="mobile-title">{active}</h1>
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">MyApp</div>
        <nav className="menu">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`menu-item ${active === item.name ? "active" : ""}`}
              onClick={() => {
                setActive(item.name);
                navigate(`/${item.name}`);
                setSidebarOpen(false); // mobil holatda sidebar yopiladi
              }}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="menu-item logout-btn">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="page-placeholder">
          <Routes>
            <Route path="filiallar" element={<BranchesPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
