import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../service/store";

import { getMe } from "../service/actions/userAction";
import { useNavigate } from "react-router-dom";

interface ProtectedTokenProps {
  children: ReactNode;
  redirectTo?: string;
}

const ProtectedToken = ({ children, redirectTo = "/login" }: ProtectedTokenProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { token, user } = useSelector((state: RootState) => state.auth);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      if (token && !user) {
        // Kalau token ada tapi user belum di-load, ambil user dulu
        try {
          await dispatch(getMe());
        } catch {
          // kalau error ambil user, misal token invalid, biarkan lanjut ke halaman login
        }
      }
      setLoading(false);
    };

    checkUser();
  }, [token, user, dispatch]);

  useEffect(() => {
    // Kalau sudah loading selesai dan user sudah ada (artinya sudah login),
    // langsung redirect ke dashboard / halaman lain yang kamu mau
    if (!loading && token && user) {
      navigate(redirectTo);
    }
  }, [loading, token, user, navigate, redirectTo]);

  if (loading)
    return (
      <div className="flex justify-center h-screen items-center bg-gray-200 opacity-45">
        <svg className="animate-spin h-16 w-16 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
      </div>
    );

  return <>{children}</>;
};

export default ProtectedToken;
