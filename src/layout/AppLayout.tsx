import { Routes, Route } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import StatisticsPage from "../pages/statistics/statistics";
import BranchesPage from "../pages/branches/branches";
import ProductsPage from "../pages/products/products";
import ClientsPage from "../pages/clients/clients";
import AppHeader from "./AppHeader";
import UsersPage from "../pages/users/users";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import ProductHistoryPage from "../pages/product-history/product-history";

export const AppLayout = () => {
   const [collapsed, setCollapsed] = useState(false);
   const toggleCollapse = () => setCollapsed(prev => !prev);
  return (
    <Layout>
      <AppSidebar collapsed={collapsed}/>
        <div className="demo-logo-vertical" />
      <Layout>
        <AppHeader collapsed={collapsed} toggleCollapse={toggleCollapse} />
        <Content
          style={{
            margin: '20px 20px',
            minHeight: 280,
            background: "white",
            borderRadius: 0,
          }}
        >
          <Routes>
            <Route path="/" element={<StatisticsPage />} />
            <Route path="branches" element={<BranchesPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="product-history" element={<ProductHistoryPage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
