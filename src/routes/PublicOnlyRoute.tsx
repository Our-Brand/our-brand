import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const PublicOnlyRoute = () => {
  const { user, token } = useAuth();
  const isAuthed = !!token || !!user;

  if (isAuthed) return <Navigate to="/projects" replace />;
  return <Outlet />;
};

export default PublicOnlyRoute;
