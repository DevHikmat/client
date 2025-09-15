import {
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/dashboard/dashboard";
import LoginPage from "./pages/login/login";
import ProtectedRoute from "./router/ProtectedRoute";
import { useAuthQuery } from "./hooks/useAuthQuery";

const App = () => {
  const { isPending, isError } = useAuthQuery();
  const navigate = useNavigate();


  if(isPending) return <h2>Loading...</h2>
  if(isError) return navigate("/login");

  return (
    <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Agar foydalanuvchi noto‘g‘ri path kiritgan bo‘lsa */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
    </div>
  );
};

export default App;
