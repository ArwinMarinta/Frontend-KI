import { NavigateFunction } from "react-router-dom";
import axios from "axios";
import { AppThunk } from "../store";
import { setToken } from "../reducers/authReducer";
import { FormChangePassword } from "../../types/authType";

const API_URL = import.meta.env.VITE_API_URL;

export const register = (fullname: string, email: string, password: string, navigate: NavigateFunction): AppThunk => {
  return async () => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        fullname,
        email,
        password,
      });

      if (response.status === 201) {
        navigate("/verify-email");
        alert("register success");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};

export const login = (email: string, password: string, navigate: NavigateFunction): AppThunk => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        dispatch(setToken(response.data.token));
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};

export const forgotPassword = (email: string, navigate: NavigateFunction): AppThunk => {
  return async () => {
    try {
      const response = await axios.post(`${API_URL}/auth/send-email-reset-password`, {
        email,
      });

      navigate("/lupa-kata-sandi", { state: { message: response.data?.message } });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorMessage = error.response.data?.message || "Terjadi kesalahan";
          navigate("/lupa-kata-sandi", {
            state: { message: errorMessage },
          });
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};

export const changePassword = (form: FormChangePassword): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      await axios.post(
        `${API_URL}/auth/send-email-reset-password`,

        {
          password: form.password,
          newPassword: form.newPassword,
          confirmPassword: form.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};
