import { useEffect, FC } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { decodeJwt, JWTPayload } from "jose";
import { useSelector } from "react-redux";
import { RootState } from "../service/store";

interface DecodedToken extends JWTPayload {
  role?: string;
}

export const ProtectedRouteAdmin: FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decodedData = decodeJwt(token) as DecodedToken;
        if (decodedData.role !== "admin" && decodedData.role !== "superAdmin") {
          navigate("/");
        }
      } catch {
        navigate("/");
      }
    }
  }, [token, navigate]);

  if (!token) {
    return <Outlet />;
  }

  try {
    const decodedData = decodeJwt(token) as DecodedToken;
    if (decodedData.role === "admin" || decodedData.role === "superAdmin") {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  } catch {
    return <Navigate to="/" />;
  }
};
