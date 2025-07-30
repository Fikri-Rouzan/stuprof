import { Navigate } from "react-router";

interface GuestRouteProps {
  children: React.ReactNode;
}

export default function GuestRoute({ children }: GuestRouteProps) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // If there is a token and role
  if (token && role) {
    // Navigate to the appropriate dashboard
    const dashboardPath =
      role === "admin" ? "/admin/dashboard" : "/student/dashboard";
    return <Navigate to={dashboardPath} replace />;
  }

  return <>{children}</>;
}
