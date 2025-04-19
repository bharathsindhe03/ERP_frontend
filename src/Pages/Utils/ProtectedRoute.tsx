import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const userRole = localStorage.getItem("role");

  return allowedRoles.includes(userRole || "") ? (
    <Outlet />
  ) : (
    <Navigate to="/forbidden" replace />
  );
}
