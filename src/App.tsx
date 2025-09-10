import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/dashboard/dashboard";
import LoginPage from "./pages/login/login";
import ProtectedRoute from "./router/ProtectedRoute";
import { useMessage } from "./hooks/useMessage";

const App = () => {
  const { contextHolder } = useMessage();
  return (
    <div>
      {contextHolder}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Agar foydalanuvchi noto‘g‘ri path kiritgan bo‘lsa */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
