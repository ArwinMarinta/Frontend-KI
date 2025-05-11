import { useState } from "react";
import { FormPersonalData } from "../../../../types/submissionType";

const usePersonalData = () => {
  const [personalData, setPersonalData] = useState<FormPersonalData[]>([
    {
      id: 1,
      name: "",
      email: "",
      faculty: null,
      studyProgram: null,
      institution: "",
      work: "",
      nationalState: "",
      countryResidence: "",
      province: "",
      city: "",
      subdistrict: "",
      ward: "",
      postalCode: "",
      phoneNumber: "",
      ktp: null as File | null,
      isLeader: false,
      facebook: null,
      whatsapp: null,
      instagram: null,
      twitter: null,
      address: "",
    },
  ]);

  const [personalDataError, setPersonalDataError] = useState(
    Array(personalData.length).fill({
      name: false,
      email: false,
      faculty: false,
      studyProgram: false,
      institution: false,
      work: false,
      nationalState: false,
      countryResidence: false,
      province: false,
      city: false,
      subdistrict: false,
      ward: false,
      postalCode: false,
      phoneNumber: false,
      ktp: false,
      isLeader: false,
      facebook: false,
      whatsapp: false,
      instagram: false,
      twitter: false,
      ktpName: false,
    })
  );

  const validatePersonalData = (data: FormPersonalData) => {
    const error = {
      id: data.id,
      name: data.name.trim() === "",
      email: !/\S+@\S+\.\S+/.test(data.email),
      faculty: data.faculty === null,
      studyProgram: data.studyProgram === null,
      institution: data.institution.trim() === "",
      work: data.work.trim() === "",
      nationalState: data.nationalState.trim() === "",
      countryResidence: data.countryResidence.trim() === "",
      province: data.province.trim() === "",
      city: data.city.trim() === "",
      subdistrict: data.subdistrict.trim() === "",
      ward: data.ward.trim() === "",
      postalCode: data.postalCode.trim() === "",
      phoneNumber: data.phoneNumber.trim() === "",
      ktp: data.ktp === null,
      facebook: false,
      whatsapp: false,
      instagram: false,
      twitter: false,
      address: data.address.trim() === "",
    };

    return error;
  };

  const handleChangePerson = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, field: keyof FormPersonalData) => {
    const updatedData = [...personalData];
    const updatedError = [...personalDataError]; // Copy error array to preserve immutability

    if (index < 0 || index >= updatedData.length) {
      console.error("Invalid index:", index);
      return;
    }

    // Handle file input
    if (e.target.type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        updatedData[index] = {
          ...updatedData[index],
          [field]: file,
        };
      }
    } else {
      updatedData[index] = {
        ...updatedData[index],
        [field]: e.target.value,
      };
    }

    // Update error state when a field is changed
    // Set error to false for the specific field that was changed
    if (updatedError[index]) {
      updatedError[index] = {
        ...updatedError[index],
        [field]: false, // Set specific field error to false
      };
    }

    // Set updated data and error to state
    setPersonalData(updatedData);
    setPersonalDataError(updatedError);
  };
  const addContributor = () => {
    // Tambah kontributor baru ke personalData
    setPersonalData([
      ...personalData,
      {
        id: personalData.length + 1,
        name: "",
        email: "",
        faculty: null,
        studyProgram: null,
        institution: "",
        work: "",
        nationalState: "",
        countryResidence: "",
        province: "",
        city: "",
        subdistrict: "",
        ward: "",
        postalCode: "",
        phoneNumber: "",
        ktp: null as File | null,
        isLeader: false,
        facebook: null,
        whatsapp: null,
        instagram: null,
        twitter: null,
        address: "",
      },
    ]);

    // Tambahkan entry error untuk kontributor baru
    setPersonalDataError([
      ...personalDataError,
      {
        name: false,
        email: false,
        institution: false,
        work: false,
        faculty: false,
        studyProgram: false,
        nationalState: false,
        countryResidence: false,
        province: false,
        city: false,
        subdistrict: false,
        ward: false,
        postalCode: false,
        phoneNumber: false,
        facebook: false,
        whatsapp: false,
        instagram: false,
        twitter: false,
        address: false,
        ktp: false,
      },
    ]);
  };
  return {
    personalData,
    addContributor,
    handleChangePerson,
    validatePersonalData,
    personalDataError,
    setPersonalDataError,
  };
};

export default usePersonalData;
