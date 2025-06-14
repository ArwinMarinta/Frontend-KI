import axios from "axios";
import { AppThunk } from "../store";
import { setCategoryDocumentDetail, setDocumentDetail, setDocumentsCategoryData, setDocumentsData } from "../reducers/manageReducer";
import { API_URL } from "../../config/config";
import { toast } from "sonner";

export const getCategoryDocument = (currentPage: number, limit: number, search?: string): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/document/by-type`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
          limit: limit,
          search: search,
        },
      });

      dispatch(
        setDocumentsCategoryData({
          docs: response.data?.docs ?? [],
          currentPage: response.data?.currentPage ?? 1,
          totalPages: response.data?.totalPages ?? 1,
          totalValue: response.data?.totalFaqs ?? 0,
          limit: response.data?.limit ?? 2,
        })
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};

export const getCategoryDocumentById = (id: string | number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/document/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setCategoryDocumentDetail(response.data?.doc ?? []));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};

export const createCategoryDocument = (type: string, currentPage: number, limit: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.post(
        `${API_URL}/document`,
        {
          type: type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(getCategoryDocument(currentPage, limit));
      toast.success(response?.data?.message);
      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
        if (error.response?.status === 401) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};

export const updateCategoryDocument = (id: string | undefined, type: string, currentPage: number, limit: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;
      const response = await axios.patch(
        `${API_URL}/document/type`,
        {
          oldType: id,
          newType: type,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(getCategoryDocument(currentPage, limit));
      toast.success(response?.data?.message);
      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
        if (error.response?.status === 401) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};

export const deleteCategoryDocument = (title: number | string | null, currentPage: number, limit: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.delete(`${API_URL}/document/type/${title}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(getCategoryDocument(currentPage, limit));
      toast.success(response?.data?.message);
      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
        if (error.response?.status === 401) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};

export const getDocuments = (title: string | undefined, currentPage: number, limit: number, search?: string): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/document/by-type/${title}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
          limit: limit,
          search: search,
        },
      });

      dispatch(
        setDocumentsData({
          docs: response.data?.docs ?? [],
          currentPage: response.data?.currentPage ?? 1,
          totalPages: response.data?.totalPages ?? 1,
          totalValue: response.data?.totalFaqs ?? 0,
          limit: response.data?.limit ?? 2,
        })
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};

export const createDocument = (title: string, file: File | null, cover: File | null, name: string | undefined, currentPage: number, limit: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const formData = new FormData();
      formData.append("title", title);
      if (file) {
        formData.append("document", file);
      }
      if (cover) {
        formData.append("cover", cover);
      }

      const response = await axios.post(`${API_URL}/document/by-type/${name}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(getDocuments(name, currentPage, limit));
      toast.success(response?.data?.message);
      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
        if (error.response?.status === 401) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};

export const updateDocument = (id: string | number, name: string, file: File | null, cover: File | null, title: string | undefined, currentPage: number, limit: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const formData = new FormData();
      formData.append("title", name);
      if (file) {
        formData.append("document", file);
      }
      if (cover) {
        formData.append("cover", cover);
      }

      const response = await axios.patch(`${API_URL}/document/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(getDocuments(title, currentPage, limit));
      toast.success(response?.data?.message);
      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
        if (error.response?.status === 401) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};

export const deleteDocument = (id: number | string | null, title: string | undefined, currentPage: number, limit: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.delete(`${API_URL}/document/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getDocuments(title, currentPage, limit));
      toast.success(response?.data?.message);
      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
        if (error.response?.status === 401) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};

export const getDocumentById = (id: string | number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/document/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setDocumentDetail(response.data?.doc ?? []));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.log(error.response.data.message);
        } else {
          console.log("No response received:", error.message);
        }
      }
    }
  };
};
