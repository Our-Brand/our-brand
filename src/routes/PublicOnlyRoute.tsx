import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const PublicOnlyRoute = () => {
  const { user, token } = useAuth();
  const isAuthed = !!token || !!user;

  if (isAuthed && user.subscription !== 0) {
    return <Navigate to="/projects" replace />;
  } else if (isAuthed && user.subscription) {
    return <Navigate to="/home" replace />;
  }
  return <Outlet />;
};

export default PublicOnlyRoute;
