import axios from "axios";
import { AppThunk } from "../store";
import { API_URL } from "../../config/config";
import { setBrandData, setCopyrightData, setDetailSubmission, setIndustrialDesignData, setPatentData, setProgresSubmission } from "../reducers/submissionReducer";
import { FormPersonalData } from "../../types/submissionType";
import { FormSubmissionCopyright } from "../../types/copyright";

export const getSubmissionPatent = (currentPage: number, limit: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/user-submission/get-by-submision-type/2`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
          limit: limit,
        },
      });

      dispatch(
        setPatentData({
          patent: response.data?.userSubmissions ?? [],
          currentPage: response.data?.currentPage ?? 1,
          totalPages: response.data?.totalPages ?? 1,
          totalValue: response.data?.totalUserSubmissions ?? 0,
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

export const getSubmissionCopyRight = (currentPage: number, limit: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/user-submission/get-by-submision-type/1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
          limit: limit,
        },
      });

      dispatch(
        setCopyrightData({
          copyright: response.data?.userSubmissions ?? [],
          currentPage: response.data?.currentPage ?? 1,
          totalPages: response.data?.totalPages ?? 1,
          totalValue: response.data?.totalUserSubmissions ?? 0,
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
export const getSubmissionBrand = (currentPage: number, limit: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/user-submission/get-by-submision-type/3`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
          limit: limit,
        },
      });

      dispatch(
        setBrandData({
          brand: response.data?.userSubmissions ?? [],
          currentPage: response.data?.currentPage ?? 1,
          totalPages: response.data?.totalPages ?? 1,
          totalValue: response.data?.totalUserSubmissions ?? 0,
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
export const getSubmissionIndustrialDesign = (currentPage: number, limit: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/user-submission/get-by-submision-type/4`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
          limit: limit,
        },
      });

      dispatch(
        setIndustrialDesignData({
          design: response.data?.userSubmissions ?? [],
          currentPage: response.data?.currentPage ?? 1,
          totalPages: response.data?.totalPages ?? 1,
          totalValue: response.data?.totalUserSubmissions ?? 0,
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

export const getDetailSubmission = (id: string | undefined): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/user-submission/get-by-id/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setDetailSubmission(response.data?.userSubmission ?? null));
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
export const getProgresSubmission = (id: string | undefined): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/user-submission/progress/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setProgresSubmission(response.data?.userSubmission.progress ?? null));
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

export const deleteSubmission = (id: number | string | null, type: string, currentPage: number, limit: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      console.log(id);
      const { token } = getState().auth;

      await axios.delete(`${API_URL}/user-submission/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (type === "Hak Cipta") {
        dispatch(getSubmissionCopyRight(currentPage, limit));
      }
      if (type === "Paten") {
        dispatch(getSubmissionPatent(currentPage, limit));
      }
      if (type === "Merek") {
        dispatch(getSubmissionBrand(currentPage, limit));
      }
      if (type === "Desain Industri") {
        dispatch(getSubmissionIndustrialDesign(currentPage, limit));
      }
      return Promise.resolve();
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

export const createSubmissionPaten = (submissionType: number, formPersonalData: FormPersonalData[], drafDocument: File | null): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const formData = new FormData();
      formData.append("submissionTypeId", submissionType.toString());

      formPersonalData.forEach((data, index) => {
        formData.append(`personalDatas[${index}][name]`, data.name);
        formData.append(`personalDatas[${index}][email]`, data.email);
        formData.append(`personalDatas[${index}][faculty]`, data.faculty ?? "");
        formData.append(`personalDatas[${index}][studyProgram]`, data.studyProgram ?? "");
        formData.append(`personalDatas[${index}][institution]`, data.institution);
        formData.append(`personalDatas[${index}][work]`, data.work);
        formData.append(`personalDatas[${index}][nationalState]`, data.nationalState);
        formData.append(`personalDatas[${index}][countryResidence]`, data.countryResidence);
        formData.append(`personalDatas[${index}][province]`, data.province);
        formData.append(`personalDatas[${index}][city]`, data.city);
        formData.append(`personalDatas[${index}][subdistrict]`, data.subdistrict);
        formData.append(`personalDatas[${index}][ward]`, data.ward);
        formData.append(`personalDatas[${index}][postalCode]`, data.postalCode);
        formData.append(`personalDatas[${index}][phoneNumber]`, data.phoneNumber);
        // Lampirkan file KTP jika ada
        // if (data.ktp) {
        //   formData.append(`personalDatas[${index}][ktp]`, data.ktp);
        // }
      });

      formPersonalData.forEach((data) => {
        if (data.ktp) {
          formData.append("ktp", data.ktp); // append setiap file KTP dengan nama field yang sama
        }
      });
      if (drafDocument) {
        formData.append("draftPatentApplicationFile", drafDocument);
      }

      const response = await axios.post(`${API_URL}/patent`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data.message);
      alert(response.data.status);
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

export const createSubmissionCopyright = (submissionType: number, formPersonalData: FormPersonalData[], formCopyright: FormSubmissionCopyright): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const formData = new FormData();
      formData.append("submissionTypeId", submissionType.toString());

      formPersonalData.forEach((data, index) => {
        formData.append(`personalDatas[${index}][name]`, data.name);
        formData.append(`personalDatas[${index}][email]`, data.email);
        formData.append(`personalDatas[${index}][faculty]`, data.faculty ?? "");
        formData.append(`personalDatas[${index}][studyProgram]`, data.studyProgram ?? "");
        formData.append(`personalDatas[${index}][institution]`, data.institution);
        formData.append(`personalDatas[${index}][work]`, data.work);
        formData.append(`personalDatas[${index}][nationalState]`, data.nationalState);
        formData.append(`personalDatas[${index}][countryResidence]`, data.countryResidence);
        formData.append(`personalDatas[${index}][province]`, data.province);
        formData.append(`personalDatas[${index}][city]`, data.city);
        formData.append(`personalDatas[${index}][subdistrict]`, data.subdistrict);
        formData.append(`personalDatas[${index}][ward]`, data.ward);
        formData.append(`personalDatas[${index}][postalCode]`, data.postalCode);
        formData.append(`personalDatas[${index}][phoneNumber]`, data.phoneNumber);
        // Lampirkan file KTP jika ada
        // if (data.ktp) {
        //   formData.append(`personalDatas[${index}][ktp]`, data.ktp);
        // }
      });

      formPersonalData.forEach((data) => {
        if (data.ktp) {
          formData.append("ktp", data.ktp);
        }
      });

      formData.append("titleInvention", formCopyright.titleInvention);
      formData.append("typeCreation", formCopyright.typeCreation);
      formData.append("subTypeCreation", formCopyright.subTypeCreation);
      formData.append("countryFirstAnnounced", formCopyright.countryFirstAnnounced);
      formData.append("cityFirstAnnounced", formCopyright.cityFirstAnnounced);
      formData.append("timeFirstAnnounced", formCopyright.timeFirstAnnounced);
      formData.append("briefDescriptionCreation", formCopyright.briefDescriptionCreation);
      if (formCopyright.statementLetter) formData.append("statementLetter", formCopyright.statementLetter);
      if (formCopyright.letterTransferCopyright) formData.append("letterTransferCopyright", formCopyright.letterTransferCopyright);
      if (formCopyright.exampleCreation) formData.append("exampleCreation", formCopyright.exampleCreation);

      const response = await axios.post(`${API_URL}/copyright`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data.message);
      alert(response.data.status);
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

export const createSubmissionIndustrialDesign = (submissionType: number, formPersonalData: FormPersonalData[], drafDocument: File | null): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const formData = new FormData();
      formData.append("submissionTypeId", submissionType.toString());

      formPersonalData.forEach((data, index) => {
        formData.append(`personalDatas[${index}][name]`, data.name);
        formData.append(`personalDatas[${index}][email]`, data.email);
        formData.append(`personalDatas[${index}][faculty]`, data.faculty ?? "");
        formData.append(`personalDatas[${index}][studyProgram]`, data.studyProgram ?? "");
        formData.append(`personalDatas[${index}][institution]`, data.institution);
        formData.append(`personalDatas[${index}][work]`, data.work);
        formData.append(`personalDatas[${index}][nationalState]`, data.nationalState);
        formData.append(`personalDatas[${index}][countryResidence]`, data.countryResidence);
        formData.append(`personalDatas[${index}][province]`, data.province);
        formData.append(`personalDatas[${index}][city]`, data.city);
        formData.append(`personalDatas[${index}][subdistrict]`, data.subdistrict);
        formData.append(`personalDatas[${index}][ward]`, data.ward);
        formData.append(`personalDatas[${index}][postalCode]`, data.postalCode);
        formData.append(`personalDatas[${index}][phoneNumber]`, data.phoneNumber);
        // Lampirkan file KTP jika ada
        // if (data.ktp) {
        //   formData.append(`personalDatas[${index}][ktp]`, data.ktp);
        // }
      });

      formPersonalData.forEach((data) => {
        if (data.ktp) {
          formData.append("ktp", data.ktp);
        }
      });
      if (drafDocument) {
        formData.append("draftDesainIndustriApplicationFile", drafDocument);
      }

      const response = await axios.post(`${API_URL}/design-industri`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data.message);
      alert(response.data.status);
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
