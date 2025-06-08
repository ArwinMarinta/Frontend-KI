import axios from "axios";
import { AppThunk } from "../store";
import { API_URL } from "../../config/config";
import { setBrandData, setCopyrightData, setDashboard, setDetailSubmission, setIndustrialDesignData, setPatentData, setProgresSubmission } from "../reducers/submissionReducer";
import { FormComplateIndustDesign, FormComplatePatenSubmission, FormPersonalData, FormUpdateProgress } from "../../types/submissionType";
import { FormSubmissionCopyright } from "../../types/copyright";
import { FormAdditionalBrand, FormSubmissionBrand } from "../../types/brandType";
import { getUserSubmission } from "./historyAction";
import { FormSchema } from "../../types/schemaPayment";
import { setReviewer } from "../reducers/userReducer";

export const getSubmissionPatent = (currentPage: number, limit: number, search?: string): AppThunk => {
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
          search: search,
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
export const getReviewer = (): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/user/reviewer`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setReviewer(response.data.users ?? []));
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

export const getSubmissionCopyRight = (currentPage: number, limit: number, search?: string): AppThunk => {
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
          search: search,
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
export const getSubmissionBrand = (currentPage: number, limit: number, search?: string): AppThunk => {
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
          search: search,
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
export const getSubmissionIndustrialDesign = (currentPage: number, limit: number, search?: string): AppThunk => {
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
          search: search,
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
export const deleteSubmissionUser = (id: number | string | null, type: string | undefined, currentPage: number, limit: number): AppThunk => {
  return async (dispatch, getState) => {
    try {
      console.log(id);
      const { token } = getState().auth;

      await axios.delete(`${API_URL}/user-submission/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const submissionTypeId = type === "Hak Cipta" ? 1 : type === "Paten" ? 2 : type === "Merek" ? 3 : type === "Desain Industri" ? 4 : undefined;
      dispatch(getUserSubmission(currentPage, limit, submissionTypeId));

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
  return async (_, getState) => {
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
        formData.append(`personalDatas[${index}][address]`, data.address);
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

      await axios.post(`${API_URL}/patent`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // if (response.status === 201) {
      //   navigate("/pengajuan/paten");
      // }
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

export const complateSubmissionPatent = (id: number, document: FormComplatePatenSubmission): AppThunk => {
  return async (_, getState) => {
    try {
      const { token } = getState().auth;

      console.log(id);

      const formData = new FormData();
      formData.append("inventionTitle", document.inventionTitle);
      if (document.patentTypeId) formData.append("patentTypeId", document.patentTypeId.toString());
      if (document.numberClaims) formData.append("numberClaims", document.numberClaims?.toString());
      if (document.claim) formData.append("claim", document.claim);
      if (document.description) formData.append("description", document.description);
      if (document.abstract) formData.append("abstract", document.abstract);
      if (document.inventionImage) formData.append("inventionImage", document.inventionImage);
      if (document.statementInventionOwnership) formData.append("statementInventionOwnership", document.statementInventionOwnership);
      if (document.letterTransferRightsInvention) formData.append("letterTransferRightsInvention", document.letterTransferRightsInvention);

      await axios.patch(`${API_URL}/patent/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
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
export const complateSubmissionIndusDesign = (id: number, document: FormComplateIndustDesign): AppThunk => {
  return async (_, getState) => {
    try {
      const { token } = getState().auth;

      console.log(document);

      const formData = new FormData();
      formData.append("titleDesign", document.titleDesign);
      formData.append("type", document.type);
      formData.append("typeDesignId", document.typeDesignId.toString());
      formData.append("subtypeDesignId", document.subtypeDesignId.toString());
      formData.append("claim", JSON.stringify(document.claim));

      if (document.looksPerspective) formData.append("looksPerspective", document.looksPerspective);
      if (document.frontView) formData.append("frontView", document.frontView);
      if (document.backView) formData.append("backView", document.backView);
      if (document.rightSideView) formData.append("rightSideView", document.rightSideView);
      if (document.lefttSideView) formData.append("lefttSideView", document.lefttSideView);
      if (document.topView) formData.append("topView", document.topView);
      if (document.downView) formData.append("downView", document.downView);
      if (document.moreImages) formData.append("moreImages", document.moreImages);
      if (document.designOwnershipLetter) formData.append("designOwnershipLetter", document.designOwnershipLetter);
      if (document.letterTransferDesignRights) formData.append("letterTransferDesignRights", document.letterTransferDesignRights);

      await axios.patch(`${API_URL}/design-industri/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
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

export const updateSubmissionPaten = (id: number, submissionType: number, formPersonalData: FormPersonalData[], drafDocument: File | null): AppThunk => {
  return async (_, getState) => {
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
        // formData.append(`personalDatas[${index}][address]`, data.address);
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

      const response = await axios.patch(`${API_URL}/patent/${id}`, formData, {
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
  return async (_, getState) => {
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
        formData.append(`personalDatas[${index}][address]`, data.address);
      });

      formPersonalData.forEach((data) => {
        if (data.ktp) {
          formData.append("ktp", data.ktp);
        }
      });
      if (drafDocument) {
        formData.append("draftDesainIndustriApplicationFile", drafDocument);
      }

      await axios.post(`${API_URL}/design-industri`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
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
  return async (_, getState) => {
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
        formData.append(`personalDatas[${index}][address]`, data.address);
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
      formData.append("typeCreationId", formCopyright.typeCreation !== null ? formCopyright.typeCreation.toString() : "");
      formData.append("subTypeCreationId", formCopyright.subTypeCreation !== null ? formCopyright.subTypeCreation.toString() : "");
      formData.append("countryFirstAnnounced", formCopyright.countryFirstAnnounced);
      formData.append("cityFirstAnnounced", formCopyright.cityFirstAnnounced);
      formData.append("timeFirstAnnounced", formCopyright.timeFirstAnnounced);
      formData.append("briefDescriptionCreation", formCopyright.briefDescriptionCreation);
      if (formCopyright.statementLetter) formData.append("statementLetter", formCopyright.statementLetter);
      if (formCopyright.letterTransferCopyright) formData.append("letterTransferCopyright", formCopyright.letterTransferCopyright);
      if (formCopyright.exampleCreation) formData.append("exampleCreation", formCopyright.exampleCreation);

      await axios.post(`${API_URL}/copyright`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
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

export const createSubmissionBrand = (submissionType: number, formPersonalData: FormPersonalData[], formBrand: FormSubmissionBrand, formAdditionalBrand: FormAdditionalBrand[]): AppThunk => {
  return async (_, getState) => {
    try {
      const { token } = getState().auth;

      const formData = new FormData();
      formData.append("submissionTypeId", submissionType.toString());

      formData.append("applicationType", formBrand.applicationType);
      formData.append("brandTypeId", formBrand.brandType?.toString() ?? "");
      formData.append("referenceName", formBrand.referenceName);
      formData.append("elementColor", formBrand.elementColor);
      formData.append("translate", formBrand.translate);
      formData.append("pronunciation", formBrand.pronunciation);
      formData.append("disclaimer", formBrand.disclaimer);
      formData.append("description", formBrand.description);
      formData.append("documentType", formBrand.documentType);
      formData.append("information", formBrand.information);

      if (formBrand.labelBrand) {
        formData.append("labelBrand", formBrand.labelBrand);
      }
      if (formBrand.fileUploade) {
        formData.append("fileUploade", formBrand.fileUploade);
      }
      if (formBrand.signature) {
        formData.append("signature", formBrand.signature);
      }
      if (formBrand.InformationLetter) {
        formData.append("InformationLetter", formBrand.InformationLetter);
      }
      if (formBrand.letterStatment) {
        formData.append("letterStatment", formBrand.letterStatment);
      }

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
        formData.append(`personalDatas[${index}][address]`, data.address);
      });

      formPersonalData.forEach((data) => {
        if (data.ktp) {
          formData.append("ktp", data.ktp);
        }
      });

      formAdditionalBrand.forEach((data, index) => {
        formData.append(`additionalDescriptions[${index}][description]`, data.additionalDescriptions);
      });

      formAdditionalBrand.forEach((data) => {
        if (data.additionalFiles) {
          formData.append("additionalFiles", data.additionalFiles);
        }
      });

      await axios.post(`${API_URL}/brand`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
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

export const updateReviewerSubmissionProgress = (id: string | undefined, form: FormUpdateProgress): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const formData = new FormData();
      formData.append("reviewStatus", form.reviewStatus);
      formData.append("comments", form.comments);
      formData.append("billingCode", form.paymentCode);
      if (form.certificateFile) formData.append("certificateFile", form.certificateFile);

      form.files.forEach((file) => {
        formData.append("files", file);
      });

      form.fileNames.forEach((file) => {
        formData.append("fileNames", file);
      });

      await axios.patch(`${API_URL}/user-submission/submission-progress/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(getDetailSubmission(id));
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

export const updateSubmissionSchema = (id: number, form: FormSchema): AppThunk => {
  return async (_, getState) => {
    try {
      const { token } = getState().auth;
      console.log(form);

      await axios.patch(
        `${API_URL}/user-submission/submission-schema/${id}`,
        {
          periodId: form.periodId,
          groupId: form.groupId,
          submissionScheme: form.submissionScheme,
          termsConditionId: form.termsConditionId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

export const revisionSubmissionPaten = (id: number | undefined, Form: FormComplatePatenSubmission): AppThunk => {
  return async (_, getState) => {
    try {
      const { token } = getState().auth;

      const formData = new FormData();
      if (Form.inventionTitle) {
        formData.append("inventionTitle", Form?.inventionTitle);
      }
      if (Form.numberClaims) {
        formData.append("numberClaims", String(Form.numberClaims));
      }
      if (Form.patentTypeId) {
        formData.append("patentTypeId", Form?.patentTypeId?.toString());
      }
      if (Form.claim) {
        formData.append("claim", Form?.claim);
      }
      if (Form.description) {
        formData.append("description", Form?.description);
      }
      if (Form.abstract) {
        formData.append("abstract", Form?.abstract);
      }
      if (Form.inventionImage) {
        formData.append("inventionImage", Form?.inventionImage);
      }
      if (Form.statementInventionOwnership) {
        formData.append("statementInventionOwnership", Form?.statementInventionOwnership);
      }
      if (Form.letterTransferRightsInvention) {
        formData.append("letterTransferRightsInvention", Form?.letterTransferRightsInvention);
      }
      if (Form.draftPatentApplicationFile) {
        formData.append("draftPatentApplicationFile", Form?.draftPatentApplicationFile);
      }

      await axios.patch(`${API_URL}/patent/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
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
export const revisionSubmissionIndustrialDesign = (id: number | undefined, Form: FormComplateIndustDesign): AppThunk => {
  return async (_, getState) => {
    try {
      const { token } = getState().auth;

      const formData = new FormData();
      if (Form.titleDesign) formData.append("titleDesign", Form.titleDesign);
      if (Form.type) formData.append("type", Form.type);
      if (Form.typeDesignId) formData.append("typeDesignId", Form.typeDesignId.toString());
      if (Form.claim) formData.append("claim", JSON.stringify(Form.claim));
      if (Form.looksPerspective) formData.append("looksPerspective", Form.looksPerspective);
      if (Form.frontView) formData.append("frontView", Form.frontView);
      if (Form.backView) formData.append("backView", Form.backView);
      if (Form.rightSideView) formData.append("rightSideView", Form.rightSideView);
      if (Form.lefttSideView) formData.append("lefttSideView", Form.lefttSideView);
      if (Form.topView) formData.append("topView", Form.topView);
      if (Form.downView) formData.append("downView", Form.downView);
      if (Form.moreImages) formData.append("moreImages", Form.moreImages);
      if (Form.letterTransferDesignRights) formData.append("letterTransferDesignRights", Form.letterTransferDesignRights);
      if (Form.designOwnershipLetter) formData.append("designOwnershipLetter", Form.designOwnershipLetter);
      if (Form.draftDesainIndustriApplicationFile) formData.append("draftDesainIndustriApplicationFile", Form.draftDesainIndustriApplicationFile);

      await axios.patch(`${API_URL}/design-industri/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
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

export const revisonSubmissionCopyright = (submissionType: number | undefined, formCopyright: FormSubmissionCopyright): AppThunk => {
  return async (_, getState) => {
    try {
      const { token } = getState().auth;

      const formData = new FormData();
      if (formCopyright.titleInvention) {
        formData.append("titleInvention", formCopyright.titleInvention);
      }

      if (formCopyright.typeCreation !== null && formCopyright.typeCreation !== undefined) {
        formData.append("typeCreation", formCopyright.typeCreation.toString());
      }

      if (formCopyright.subTypeCreation !== null && formCopyright.subTypeCreation !== undefined) {
        formData.append("subTypeCreation", formCopyright.subTypeCreation.toString());
      }

      if (formCopyright.countryFirstAnnounced) {
        formData.append("countryFirstAnnounced", formCopyright.countryFirstAnnounced);
      }

      if (formCopyright.cityFirstAnnounced) {
        formData.append("cityFirstAnnounced", formCopyright.cityFirstAnnounced);
      }

      if (formCopyright.timeFirstAnnounced) {
        formData.append("timeFirstAnnounced", formCopyright.timeFirstAnnounced);
      }

      if (formCopyright.briefDescriptionCreation) {
        formData.append("briefDescriptionCreation", formCopyright.briefDescriptionCreation);
      }
      if (formCopyright.letterTransferCopyright) {
        formData.append("letterTransferCopyright", formCopyright.letterTransferCopyright);
      }
      if (formCopyright.statementLetter) {
        formData.append("statementLetter", formCopyright.statementLetter);
      }
      if (formCopyright.exampleCreation) {
        formData.append("exampleCreation", formCopyright.exampleCreation);
      }

      await axios.patch(`${API_URL}/copyright/${submissionType}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
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
export const complateSubmissionCopyright = (submissionType: number | undefined, formCopyright: FormSubmissionCopyright): AppThunk => {
  return async (_, getState) => {
    try {
      const { token } = getState().auth;

      const formData = new FormData();

      if (formCopyright.letterTransferCopyright) {
        formData.append("letterTransferCopyright", formCopyright.letterTransferCopyright);
      }
      if (formCopyright.statementLetter) {
        formData.append("statementLetter", formCopyright.statementLetter);
      }

      await axios.patch(`${API_URL}/copyright/${submissionType}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
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

export const revisonSubmissionBrand = (id: number | undefined, Form: FormSubmissionBrand, formAdditionalBrand: FormAdditionalBrand[]): AppThunk => {
  return async (_, getState) => {
    try {
      const { token } = getState().auth;

      const formData = new FormData();

      if (Form.applicationType) {
        formData.append("applicationType", Form.applicationType);
      }

      if (Form.brandType) {
        formData.append("brandType", Form.brandType.toString());
      }

      if (Form.referenceName) {
        formData.append("referenceName", Form.referenceName);
      }

      if (Form.elementColor) {
        formData.append("elementColor", Form.elementColor);
      }

      if (Form.translate) {
        formData.append("translate", Form.translate);
      }

      if (Form.pronunciation) {
        formData.append("pronunciation", Form.pronunciation);
      }

      if (Form.disclaimer) {
        formData.append("disclaimer", Form.disclaimer);
      }

      if (Form.description) {
        formData.append("description", Form.description);
      }

      if (Form.documentType) {
        formData.append("documentType", Form.documentType);
      }

      if (Form.information) {
        formData.append("information", Form.information);
      }

      if (Form.labelBrand) {
        formData.append("labelBrand", Form.labelBrand);
      }

      if (Form.fileUploade) {
        formData.append("fileUploade", Form.fileUploade);
      }

      if (Form.signature) {
        formData.append("signature", Form.signature);
      }

      if (Form.InformationLetter) {
        formData.append("InformationLetter", Form.InformationLetter);
      }

      if (Form.letterStatment) {
        formData.append("letterStatment", Form.letterStatment);
      }

      formAdditionalBrand.forEach((data, index) => {
        if (data.additionalDescriptions) {
          formData.append(`additionalDatas[${index}][description]`, data.additionalDescriptions);
        }
      });

      formAdditionalBrand.forEach((data) => {
        if (data.additionalFiles) {
          formData.append("additionalDataFiles", data.additionalFiles);
        }
      });

      await axios.patch(`${API_URL}/brand/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
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

export const confirmPayment = (id: number | undefined, file: File | null): AppThunk => {
  return async (_, getState) => {
    try {
      const { token } = getState().auth;

      const formData = new FormData();

      if (file) {
        formData.append("proofPayment", file);
      }
      formData.append("paymentStatus", "true");

      await axios.patch(`${API_URL}/payment/payment-proof/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
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

export const getDashboardAdmin = (): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const response = await axios.get(`${API_URL}/user-submission/admin-dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setDashboard(response.data ?? null));
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

export const updateSubmissionCopyright = (id: number, formPersonalData: FormPersonalData[], formCopyright: FormSubmissionCopyright): AppThunk => {
  return async (_, getState) => {
    try {
      const { token } = getState().auth;
      // const firstId = formPersonalData?.[0]?.id ?? null;

      const formData = new FormData();

      formPersonalData.forEach((data, index) => {
        // if (data.id && index > 0 && firstId) {
        //   const previousId = formPersonalData[index - 1]?.id;
        //   if (previousId !== undefined && data.id >= firstId) {
        //     formData.append(`personalDatas[${index}][id]`, data.id.toString());
        //   }
        // } else if (data.id && index === 0) {
        //   // index 0, kirim langsung
        //   formData.append(`personalDatas[${index}][id]`, data.id.toString());
        // }
        if (data.id) formData.append(`personalDatas[${index}][id]`, data?.id.toString());
        if (data.name) formData.append(`personalDatas[${index}][name]`, data.name);
        if (data.email) formData.append(`personalDatas[${index}][email]`, data.email);
        if (data.faculty) formData.append(`personalDatas[${index}][faculty]`, data.faculty);
        if (data.studyProgram) formData.append(`personalDatas[${index}][studyProgram]`, data.studyProgram);
        if (data.institution) formData.append(`personalDatas[${index}][institution]`, data.institution);
        if (data.work) formData.append(`personalDatas[${index}][work]`, data.work);
        if (data.nationalState) formData.append(`personalDatas[${index}][nationalState]`, data.nationalState);
        if (data.countryResidence) formData.append(`personalDatas[${index}][countryResidence]`, data.countryResidence);
        if (data.province) formData.append(`personalDatas[${index}][province]`, data.province);
        if (data.city) formData.append(`personalDatas[${index}][city]`, data.city);
        if (data.subdistrict) formData.append(`personalDatas[${index}][subdistrict]`, data.subdistrict);
        if (data.ward) formData.append(`personalDatas[${index}][ward]`, data.ward);
        if (data.postalCode) formData.append(`personalDatas[${index}][postalCode]`, data.postalCode);
        if (data.phoneNumber) formData.append(`personalDatas[${index}][phoneNumber]`, data.phoneNumber);
        if (data.address) formData.append(`personalDatas[${index}][address]`, data.address);
        // Lampirkan file KTP jika ada
        // if (data.ktp) {
        //   formData.append(`personalDatas[${index}][ktp]`, data.ktp);
        // }
      });

      formPersonalData.forEach((data) => {
        if (data.ktp) {
          formData.append("ktpFiles", data.ktp);
        }
      });

      if (formCopyright.titleInvention) {
        formData.append("titleInvention", formCopyright.titleInvention);
      }

      if (formCopyright.typeCreation) {
        formData.append("typeCreationId", formCopyright.typeCreation.toString());
      }

      if (formCopyright.subTypeCreation) {
        formData.append("subTypeCreationId", formCopyright.subTypeCreation.toString());
      }

      if (formCopyright.countryFirstAnnounced) {
        formData.append("countryFirstAnnounced", formCopyright.countryFirstAnnounced);
      }

      if (formCopyright.cityFirstAnnounced) {
        formData.append("cityFirstAnnounced", formCopyright.cityFirstAnnounced);
      }

      if (formCopyright.timeFirstAnnounced) {
        formData.append("timeFirstAnnounced", formCopyright.timeFirstAnnounced);
      }

      if (formCopyright.briefDescriptionCreation) {
        formData.append("briefDescriptionCreation", formCopyright.briefDescriptionCreation);
      }
      if (formCopyright.statementLetter) formData.append("statementLetter", formCopyright.statementLetter);
      if (formCopyright.letterTransferCopyright) formData.append("letterTransferCopyright", formCopyright.letterTransferCopyright);
      if (formCopyright.exampleCreation) formData.append("exampleCreation", formCopyright.exampleCreation);

      await axios.patch(`${API_URL}/submission/personal-data-copyright/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
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

export const updateSubmissionPatenPending = (submissionType: number, formPersonalData: FormPersonalData[], drafDocument: File | null): AppThunk => {
  return async (_, getState) => {
    try {
      const { token } = getState().auth;
      const firstId = formPersonalData?.[0]?.id ?? null;

      const formData = new FormData();

      formPersonalData.forEach((data, index) => {
        if (data.id && index > 0 && firstId) {
          const previousId = formPersonalData[index - 1]?.id;
          if (previousId !== undefined && data.id >= firstId) {
            formData.append(`personalDatas[${index}][id]`, data.id.toString());
          }
        } else if (data.id && index === 0) {
          // index 0, kirim langsung
          formData.append(`personalDatas[${index}][id]`, data.id.toString());
        }
        if (data.name) formData.append(`personalDatas[${index}][name]`, data.name);
        if (data.email) formData.append(`personalDatas[${index}][email]`, data.email);
        if (data.faculty) formData.append(`personalDatas[${index}][faculty]`, data.faculty);
        if (data.studyProgram) formData.append(`personalDatas[${index}][studyProgram]`, data.studyProgram);
        if (data.institution) formData.append(`personalDatas[${index}][institution]`, data.institution);
        if (data.work) formData.append(`personalDatas[${index}][work]`, data.work);
        if (data.nationalState) formData.append(`personalDatas[${index}][nationalState]`, data.nationalState);
        if (data.countryResidence) formData.append(`personalDatas[${index}][countryResidence]`, data.countryResidence);
        if (data.province) formData.append(`personalDatas[${index}][province]`, data.province);
        if (data.city) formData.append(`personalDatas[${index}][city]`, data.city);
        if (data.subdistrict) formData.append(`personalDatas[${index}][subdistrict]`, data.subdistrict);
        if (data.ward) formData.append(`personalDatas[${index}][ward]`, data.ward);
        if (data.postalCode) formData.append(`personalDatas[${index}][postalCode]`, data.postalCode);
        if (data.phoneNumber) formData.append(`personalDatas[${index}][phoneNumber]`, data.phoneNumber);
        if (data.address) formData.append(`personalDatas[${index}][address]`, data.address);
        // Lampirkan file KTP jika ada
        // if (data.ktp) {
        //   formData.append(`personalDatas[${index}][ktp]`, data.ktp);
        // }
      });

      formPersonalData.forEach((data) => {
        if (data.ktp) {
          formData.append("ktpFiles", data.ktp);
        }
      });
      if (drafDocument) {
        formData.append("draftPatentApplicationFile", drafDocument);
      }

      await axios.patch(`${API_URL}/submission/personal-data-patent/${submissionType}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // if (response.status === 201) {
      //   navigate("/pengajuan/paten");
      // }
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

export const updateSubmissionIndustrialDesign = (submissionType: number, formPersonalData: FormPersonalData[], drafDocument: File | null): AppThunk => {
  return async (_, getState) => {
    try {
      const { token } = getState().auth;
      const firstId = formPersonalData?.[0]?.id ?? undefined;

      const formData = new FormData();

      formPersonalData.forEach((data, index) => {
        if (data.id && index > 0 && firstId) {
          const previousId = formPersonalData[index - 1]?.id;
          if (previousId !== undefined && data.id >= firstId) {
            formData.append(`personalDatas[${index}][id]`, data.id.toString());
          }
        } else if (data.id && index === 0) {
          // index 0, kirim langsung
          formData.append(`personalDatas[${index}][id]`, data.id.toString());
        }
        if (data.name) formData.append(`personalDatas[${index}][name]`, data.name);
        if (data.email) formData.append(`personalDatas[${index}][email]`, data.email);
        if (data.faculty) formData.append(`personalDatas[${index}][faculty]`, data.faculty);
        if (data.studyProgram) formData.append(`personalDatas[${index}][studyProgram]`, data.studyProgram);
        if (data.institution) formData.append(`personalDatas[${index}][institution]`, data.institution);
        if (data.work) formData.append(`personalDatas[${index}][work]`, data.work);
        if (data.nationalState) formData.append(`personalDatas[${index}][nationalState]`, data.nationalState);
        if (data.countryResidence) formData.append(`personalDatas[${index}][countryResidence]`, data.countryResidence);
        if (data.province) formData.append(`personalDatas[${index}][province]`, data.province);
        if (data.city) formData.append(`personalDatas[${index}][city]`, data.city);
        if (data.subdistrict) formData.append(`personalDatas[${index}][subdistrict]`, data.subdistrict);
        if (data.ward) formData.append(`personalDatas[${index}][ward]`, data.ward);
        if (data.postalCode) formData.append(`personalDatas[${index}][postalCode]`, data.postalCode);
        if (data.phoneNumber) formData.append(`personalDatas[${index}][phoneNumber]`, data.phoneNumber);
        if (data.address) formData.append(`personalDatas[${index}][address]`, data.address);
        // Lampirkan file KTP jika ada
        // if (data.ktp) {
        //   formData.append(`personalDatas[${index}][ktp]`, data.ktp);
        // }
      });

      formPersonalData.forEach((data) => {
        if (data.ktp) {
          formData.append("ktpFiles", data.ktp);
        }
      });
      if (drafDocument) {
        formData.append("draftDesainIndustriApplicationFile", drafDocument);
      }

      await axios.patch(`${API_URL}/submission/personal-data-design-industri/${submissionType}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // if (response.status === 201) {
      //   navigate("/pengajuan/paten");
      // }
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

export const updateSubmissionBrand = (id: number | undefined, formPersonalData: FormPersonalData[], Form: FormSubmissionBrand, formAdditionalBrand: FormAdditionalBrand[]): AppThunk => {
  return async (_, getState) => {
    try {
      const { token } = getState().auth;
      const firstId = formPersonalData?.[0]?.id ?? undefined;
      const formData = new FormData();

      formPersonalData.forEach((data, index) => {
        if (data.id && index > 0 && firstId) {
          const previousId = formPersonalData[index - 1]?.id;
          if (previousId !== undefined && data.id >= firstId) {
            formData.append(`personalDatas[${index}][id]`, data.id.toString());
          }
        } else if (data.id && index === 0) {
          // index 0, kirim langsung
          formData.append(`personalDatas[${index}][id]`, data.id.toString());
        }
        if (data.name) formData.append(`personalDatas[${index}][name]`, data.name);
        if (data.email) formData.append(`personalDatas[${index}][email]`, data.email);
        if (data.faculty) formData.append(`personalDatas[${index}][faculty]`, data.faculty);
        if (data.studyProgram) formData.append(`personalDatas[${index}][studyProgram]`, data.studyProgram);
        if (data.institution) formData.append(`personalDatas[${index}][institution]`, data.institution);
        if (data.work) formData.append(`personalDatas[${index}][work]`, data.work);
        if (data.nationalState) formData.append(`personalDatas[${index}][nationalState]`, data.nationalState);
        if (data.countryResidence) formData.append(`personalDatas[${index}][countryResidence]`, data.countryResidence);
        if (data.province) formData.append(`personalDatas[${index}][province]`, data.province);
        if (data.city) formData.append(`personalDatas[${index}][city]`, data.city);
        if (data.subdistrict) formData.append(`personalDatas[${index}][subdistrict]`, data.subdistrict);
        if (data.ward) formData.append(`personalDatas[${index}][ward]`, data.ward);
        if (data.postalCode) formData.append(`personalDatas[${index}][postalCode]`, data.postalCode);
        if (data.phoneNumber) formData.append(`personalDatas[${index}][phoneNumber]`, data.phoneNumber);
        if (data.address) formData.append(`personalDatas[${index}][address]`, data.address);
        // Lampirkan file KTP jika ada
        // if (data.ktp) {
        //   formData.append(`personalDatas[${index}][ktp]`, data.ktp);
        // }
      });

      formPersonalData.forEach((data) => {
        if (data.ktp) {
          formData.append("ktpFiles", data.ktp);
        }
      });

      if (Form.brandType) {
        formData.append("brandType", Form.brandType.toString());
      }

      if (Form.referenceName) {
        formData.append("referenceName", Form.referenceName);
      }

      if (Form.elementColor) {
        formData.append("elementColor", Form.elementColor);
      }

      if (Form.translate) {
        formData.append("translate", Form.translate);
      }

      if (Form.pronunciation) {
        formData.append("pronunciation", Form.pronunciation);
      }

      if (Form.disclaimer) {
        formData.append("disclaimer", Form.disclaimer);
      }

      if (Form.description) {
        formData.append("description", Form.description);
      }

      if (Form.documentType) {
        formData.append("documentType", Form.documentType);
      }

      if (Form.information) {
        formData.append("information", Form.information);
      }

      if (Form.labelBrand) {
        formData.append("labelBrand", Form.labelBrand);
      }

      if (Form.fileUploade) {
        formData.append("fileUploade", Form.fileUploade);
      }

      if (Form.signature) {
        formData.append("signature", Form.signature);
      }

      if (Form.InformationLetter) {
        formData.append("InformationLetter", Form.InformationLetter);
      }

      if (Form.letterStatment) {
        formData.append("letterStatment", Form.letterStatment);
      }

      // formAdditionalBrand.forEach((data, index) => {
      //   if (data.additionalDescriptions) {
      //     formData.append(`additionalDescriptions[${index}][description]`, data.additionalDescriptions);
      //   }
      // });

      // formAdditionalBrand.forEach((data) => {
      //   if (data.additionalFiles) {
      //     formData.append("additionalFiles", data.additionalFiles);
      //   }
      // });

      await axios.patch(`${API_URL}/submission/personal-data-brand/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
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

export const complateSubmissionBrand = (id: number | undefined, Form: FormSubmissionBrand): AppThunk => {
  return async (_, getState) => {
    try {
      const { token } = getState().auth;

      const formData = new FormData();

      if (Form.fileUploade) {
        formData.append("fileUploade", Form.fileUploade);
      }

      await axios.patch(`${API_URL}/brand/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
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

export const updatePersonalData = (id: number | undefined, formPersonalData: FormPersonalData[]): AppThunk => {
  return async (_, getState) => {
    try {
      const { token } = getState().auth;
      const formData = new FormData();

      formPersonalData.forEach((data, index) => {
        if (data.id) formData.append(`personalDatas[${index}][id]`, data.id.toString());
        if (data.name) formData.append(`personalDatas[${index}][name]`, data.name);
        if (data.email) formData.append(`personalDatas[${index}][email]`, data.email);
        if (data.faculty) formData.append(`personalDatas[${index}][faculty]`, data.faculty);
        if (data.studyProgram) formData.append(`personalDatas[${index}][studyProgram]`, data.studyProgram);
        if (data.institution) formData.append(`personalDatas[${index}][institution]`, data.institution);
        if (data.work) formData.append(`personalDatas[${index}][work]`, data.work);
        if (data.nationalState) formData.append(`personalDatas[${index}][nationalState]`, data.nationalState);
        if (data.countryResidence) formData.append(`personalDatas[${index}][countryResidence]`, data.countryResidence);
        if (data.province) formData.append(`personalDatas[${index}][province]`, data.province);
        if (data.city) formData.append(`personalDatas[${index}][city]`, data.city);
        if (data.subdistrict) formData.append(`personalDatas[${index}][subdistrict]`, data.subdistrict);
        if (data.ward) formData.append(`personalDatas[${index}][ward]`, data.ward);
        if (data.postalCode) formData.append(`personalDatas[${index}][postalCode]`, data.postalCode);
        if (data.phoneNumber) formData.append(`personalDatas[${index}][phoneNumber]`, data.phoneNumber);
        if (data.address) formData.append(`personalDatas[${index}][address]`, data.address);
      });

      formPersonalData.forEach((data) => {
        if (data.ktp) {
          formData.append("ktpFiles", data.ktp);
        }
      });

      await axios.patch(`${API_URL}/submission/personal-data/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
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
