import { NavigateFunction } from "react-router-dom";
import axios from "axios";
import { AppThunk } from "../store";
import { setToken, setUser } from "../reducers/authReducer";
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
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorMessage = error.response.data?.message || "Terjadi kesalahan";
          navigate("/register", {
            state: { message: errorMessage },
          });
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

        if (response.data.role === "superAdmin" || response.data.role === "admin") {
          navigate("/dashboard");
        }

        if (response.data.role === "user" || response.data.role === "reviewer") {
          navigate("/dashboard/pengajuan");
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log(error.response.data.message);
          if (error.response.data.message === "Email belum diverifikasi. Link verifikasi telah dikirim ulang ke email Anda.") {
            navigate("/verify-email");
          } else {
            const errorMessage = error.response.data?.message || "Terjadi kesalahan";
            navigate("/login", {
              state: { message: errorMessage },
            });
          }
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
  return async (_, getState) => {
    try {
      const { token } = getState().auth;

      await axios.post(
        `${API_URL}/user/password`,

        {
          oldPassword: form.password,
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

export const logout = (): AppThunk => {
  return async (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
  };
};

export const resetPassword = (token: string | undefined, newPassword: string, confPassword: string, navigate: NavigateFunction): AppThunk => {
  return async () => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/reset-password/${token}`,

        {
          newPassword: newPassword,
          confirmPassword: confPassword,
        }
      );

      if (response.status === 200) {
        navigate(`/resset-password/${token}`, { state: { message: response.data?.message } });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorMessage = error.response.data?.message || "Terjadi kesalahan";
          navigate(`/resset-password/${token}`, {
            state: { message: errorMessage },
          });
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};

export const activationAccount = (token: string | undefined, navigate: NavigateFunction): AppThunk => {
  return async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/verify-email/${token}`);

      if (response.data.message === "Email berhasil diverifikasi. Akun Anda kini aktif.") {
        navigate(`/aktivasi-email/${token}`, { state: { message: "berhasil" } });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log(error.response.data.message);
          if (error.response.data.message === "Email sudah diverifikasi sebelumnya.") {
            navigate(`/login`);
          }
        } else {
          navigate(`/aktivasi-email/${token}`, { state: { message: "berhasil" } });
        }
      }
    }
  };
};

export const loginWithGoogleAction = (accessToken: string, navigate: NavigateFunction): AppThunk => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/login-google`,
        { accessToken: accessToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        dispatch(setToken(response.data.token));
        if (response.data.role === "superAdmin" || response.data.role === "admin") {
          navigate("/dashboard");
        }

        if (response.data.role === "user" || response.data.role === "reviewer") {
          navigate("/dashboard/pengajuan");
        }
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
