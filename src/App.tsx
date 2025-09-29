import {
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import "./App.css";
import DashboardPage from "./pages/dashboard/dashboard";
import LoginPage from "./pages/login/login";
import ProtectedRoute from "./router/ProtectedRoute";
import { useAuthQuery } from "./hooks/useAuthQuery";
import {AppLayout} from "./layout/AppLayout"

const App = () => {
  const { isPending, isError } = useAuthQuery();

  if (isPending) return <h2>Loading...</h2>;
  if (isError) return <Navigate to="/login" replace />;

  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AppLayout />}>
          <Route
          path="/*"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
