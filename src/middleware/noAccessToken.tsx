import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../service/store";
import { useNavigate } from "react-router-dom";
import { getMe } from "../service/actions/userAction";

interface NoAccessTokenProps {
  children: ReactNode;
}

const NoAccessToken = ({ children }: NoAccessTokenProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      if (token && !user) {
        try {
          await dispatch(getMe());
          setLoading(false);
        } catch {
          navigate("/login");
        }
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch, navigate, token, user]);

  if (loading)
    return (
      <div className="flex justify-center h-screen items-center bg-gray-200 opacity-45">
        <svg className="animate-spin h-16 w-16 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
      </div>
    );

  // Jika sudah valid, render anak-anaknya
  return <>{children}</>;
};

export default NoAccessToken;
