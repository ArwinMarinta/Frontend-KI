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

export default NoAccessToken;
