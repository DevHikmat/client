import React from "react";
import { Card } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const dailyExpenses = [
  { day: "Mon", expense: 120 },
  { day: "Tue", expense: 90 },
  { day: "Wed", expense: 150 },
  { day: "Thu", expense: 80 },
  { day: "Fri", expense: 200 },
  { day: "Sat", expense: 140 },
  { day: "Sun", expense: 170 },
];

const monthlyExpenses = [
  { month: "Jan", expense: 1200 },
  { month: "Feb", expense: 950 },
  { month: "Mar", expense: 1750 },
  { month: "Apr", expense: 1320 },
  { month: "May", expense: 1680 },
  { month: "Jun", expense: 1450 },
];

const debtData = [
  { name: "Qarzdorlar", value: 25 },
  { name: "Haqdorlar", value: 40 },
];

const COLORS = ["#FF6B6B", "#4ECDC4"];

const monthlyProfit = [
  { month: "Jan", profit: 3200 },
  { month: "Feb", profit: 2800 },
  { month: "Mar", profit: 4000 },
  { month: "Apr", profit: 3500 },
  { month: "May", profit: 4200 },
  { month: "Jun", profit: 3900 },
];

const totalProducts = 1250;

const StatisticsPage: React.FC = () => {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">📊 Dashboard Statistics</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="rounded-2xl shadow-md border-l-4 border-blue-500">
          <p className="text-gray-500">Jami Ombordagi Mahsulotlar</p>
          <h2 className="text-2xl font-bold text-blue-600">{totalProducts}</h2>
        </Card>
        <Card className="rounded-2xl shadow-md border-l-4 border-green-500">
          <p className="text-gray-500">Oylik Foyda</p>
          <h2 className="text-2xl font-bold text-green-600">$4200</h2>
        </Card>
        <Card className="rounded-2xl shadow-md border-l-4 border-red-500">
          <p className="text-gray-500">Qarzdorlar</p>
          <h2 className="text-2xl font-bold text-red-600">25</h2>
        </Card>
        <Card className="rounded-2xl shadow-md border-l-4 border-purple-500">
          <p className="text-gray-500">Haqdorlar</p>
          <h2 className="text-2xl font-bold text-purple-600">40</h2>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Daily Expenses */}
        <Card className="rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Kunlik Xarajatlar</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dailyExpenses}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="expense" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Monthly Expenses */}
        <Card className="rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Oylik Xarajatlar</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyExpenses}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="expense" fill="#82ca9d" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Debtors vs Creditors */}
        <Card className="rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Qarzdorlar va Haqdorlar</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={debtData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {debtData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Monthly Profit */}
        <Card className="rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Oylik Umumiy Foyda</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyProfit}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="profit" fill="#4ECDC4" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default StatisticsPage;
