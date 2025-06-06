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
        <div className="bg-transparent p-6 rounded-md flex flex-col items-center gap-6">
          {/* Spinner sederhana */}
          <svg width="120" height="30" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="white">
            <circle cx="15" cy="15" r="15">
              <animate attributeName="opacity" begin="0s" dur="1.4s" values="1;0.3;1" repeatCount="indefinite" />
            </circle>
            <circle cx="60" cy="15" r="15">
              <animate attributeName="opacity" begin="0.2s" dur="1.4s" values="1;0.3;1" repeatCount="indefinite" />
            </circle>
            <circle cx="105" cy="15" r="15">
              <animate attributeName="opacity" begin="0.4s" dur="1.4s" values="1;0.3;1" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      </div>
    );

  return <>{children}</>;
};

export default ProtectedToken;
