import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = () => {
  const { user, token } = useAuth();
  const location = useLocation();

  const isAuthed = !!token || !!user;

  if (!isAuthed) {
    return (
      <Navigate
        to="/auth"
        replace
        state={{ from: location.pathname + location.search + location.hash }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
