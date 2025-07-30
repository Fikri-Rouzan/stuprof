import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: "admin" | "student";
}

export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // If the user has not logged in at all
  if (!token || !role) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  // If the role does not match what the page requires
  if (role !== requiredRole) {
    // Redirect them to their correct dashboard
    const ownDashboardPath =
      role === "admin" ? "/admin/dashboard" : "/student/dashboard";
    return <Navigate to={ownDashboardPath} replace />;
  }

  return <>{children}</>;
}
