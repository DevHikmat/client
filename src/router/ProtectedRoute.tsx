import { Navigate } from "react-router-dom";
import { useAuthQuery } from "../hooks/useAuthQuery";
import type { JSX } from "react/jsx-dev-runtime";

type Props = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: Props) => {
  const { data: user, isLoading } = useAuthQuery();

  if (isLoading) return <p>⏳ Loading...</p>;

  if (!user) {
    // foydalanuvchi login qilmagan bo‘lsa → login sahifaga
    return <Navigate to="/login" replace />;
  }

  // foydalanuvchi bor bo‘lsa → kirishga ruxsat
  return children;
};

export default ProtectedRoute;
