import { useEffect, FC } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { decodeJwt, JWTPayload } from "jose";
import { useSelector } from "react-redux";
import { RootState } from "../service/store";

interface DecodedToken extends JWTPayload {
  role?: string;
}

export const ProtectedRouteSuperAdmin: FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decodedData = decodeJwt(token) as DecodedToken;
        if (decodedData.role !== "superAdmin") {
          navigate("/*"); // Jika bukan superadmin, arahkan ke not found
        }
      } catch {
        navigate("/*"); // Jika token error saat decode
      }
    }
  }, [token, navigate]);

  if (!token) {
    return <Outlet />;
  }

  try {
    const decodedData = decodeJwt(token) as DecodedToken;
    if (decodedData.role === "superAdmin") {
      return <Outlet />; // Jika superadmin, izinkan akses
    } else {
      return <Navigate to="/*" />; // Jika bukan, redirect
    }
  } catch {
    return <Navigate to="/*" />; // Jika token tidak valid
  }
};
