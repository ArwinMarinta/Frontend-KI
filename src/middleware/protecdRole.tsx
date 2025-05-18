import { useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../service/store";

interface ProtectedRouteRoleProps {
  allowedRoles: string[];
  redirectTo?: string;
}

const ProtectedRouteRole = ({ allowedRoles, redirectTo = "/" }: ProtectedRouteRoleProps) => {
  const navigate = useNavigate();
  const { token, user } = useSelector((state: RootState) => state.auth);

  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (user && user.role) {
      if (allowedRoles.includes(user.role)) {
        setHasAccess(true);
      } else {
        setHasAccess(false);
      }
      setLoading(false);
    } else {
      navigate("/");
      setLoading(false);
      setHasAccess(false);
    }
  }, [token, user, allowedRoles, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center h-screen items-center bg-gray-200 opacity-45">
        <svg className="animate-spin h-16 w-16 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
      </div>
    );
  }

  if (!hasAccess) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default ProtectedRouteRole;
