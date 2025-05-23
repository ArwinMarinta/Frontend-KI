import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { loginWithGoogleAction } from "../../../../service/actions/authAction";
import { AppDispatch } from "../../../../service/store";

const GoogleLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const loginGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) => dispatch(loginWithGoogleAction(responseGoogle.access_token, navigate)),
    onError: (errorResponse) => {
      alert(errorResponse.error_description);
    },
  });
  return (
    <button onClick={() => loginGoogle()} className="bg-white border flex justify-center items-center gap-2 border-PRIMARY01 w-full  p-2 rounded-md transition">
      <FcGoogle className="text-2xl" />
      <span>Masuk dengan Google</span>
    </button>
  );
};

export default GoogleLogin;
