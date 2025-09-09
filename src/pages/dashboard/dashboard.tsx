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

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Statistics", icon: BarChart3 },
  { name: "Users", icon: Users },
  { name: "Branches", icon: GitBranch },
  { name: "Products", icon: Package },
  { name: "Histories", icon: History },
  { name: "Clients", icon: UserCircle2 },
  { name: "Settings", icon: Settings },
];

const Dashboard = () => {
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
        <h1 className="page-title">{active}</h1>
        <div className="page-placeholder">
          <p>
            This is the <strong>{active}</strong> page content.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
