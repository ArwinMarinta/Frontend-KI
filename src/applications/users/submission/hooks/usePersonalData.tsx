import { useState } from "react";
import { FormPersonalData, PersonalDataError } from "../../../../types/submissionType";

const usePersonalData = () => {
  const [personalData, setPersonalData] = useState<FormPersonalData[]>([
    {
      id: null,
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
      ktp: null,
      isLeader: false,
      facebook: null,
      whatsapp: null,
      instagram: null,
      twitter: null,
      address: "",
      ktpName: "",
      uploadKtp: false,
      ktpFileIndex: null,
    },
  ]);

  const [updateKtp, setUpdateKtp] = useState<File[]>([]);

  console.log(personalData);
  console.log(updateKtp);

  const [personalDataError, setPersonalDataError] = useState<PersonalDataError[]>(
    personalData.map(() => ({
      id: null,
      name: null,
      email: null,
      faculty: null,
      studyProgram: null,
      institution: null,
      work: null,
      nationalState: null,
      countryResidence: null,
      province: null,
      city: null,
      subdistrict: null,
      ward: null,
      postalCode: null,
      phoneNumber: null,
      ktp: null,
      isLeader: null,
      facebook: null,
      whatsapp: null,
      instagram: null,
      twitter: null,
      address: null,
    }))
  );

  const validatePersonalData = (data: FormPersonalData) => {
    const error = {
      id: data.id ?? null,
      name: data.name.trim() === "" ? "Nama wajib diisi" : null,
      email: !/\S+@\S+\.\S+/.test(data.email) ? "Format email tidak valid" : null,
      faculty: data.faculty === null ? "Fakultas wajib dipilih" : null,
      studyProgram: data.studyProgram === null ? "Program studi wajib dipilih" : null,
      institution: data.institution.trim() === "" ? "Institusi wajib diisi" : null,
      work: data.work.trim() === "" ? "Pekerjaan wajib diisi" : null,
      nationalState: data.nationalState.trim() === "" ? "Kewarganegaraan wajib diisi" : null,
      countryResidence: data.countryResidence.trim() === "" ? "Negara tempat tinggal wajib diisi" : null,
      province: data.province.trim() === "" ? "Provinsi wajib diisi" : null,
      city: data.city.trim() === "" ? "Kota wajib diisi" : null,
      subdistrict: data.subdistrict.trim() === "" ? "Kecamatan wajib diisi" : null,
      ward: data.ward.trim() === "" ? "Kelurahan wajib diisi" : null,
      postalCode: data.postalCode.trim() === "" ? "Kode pos wajib diisi" : null,
      phoneNumber: data.phoneNumber.trim() === "" ? "Nomor telepon wajib diisi" : null,
      ktp: data.ktp === null ? "KTP wajib diunggah" : null,
      address: data.address?.trim() === "" ? "Alamat wajib diisi" : null,
      isLeader: null,
      facebook: null,
      whatsapp: null,
      instagram: null,
      twitter: null,
    };

    return error;
  };

  const handleChangePerson = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, field: keyof FormPersonalData) => {
    // ----- Salin state lama -----
    const updatedData = [...personalData];
    const updatedError = [...personalDataError]; // jika ada validasi

    // ----- Jika field bertipe file -----
    if (e.target.type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0];

      if (file) {
        const maxSize = 20 * 1024 * 1024;

        if (file.size > maxSize) {
          updatedError[index] = {
            ...updatedError[index],
            [field]: "Ukuran file maksimal 20MB",
          };
        } else {
          /* 1️⃣  perbarui personalData[index] */
          setUpdateKtp((prev) => [...prev, file]);

          // 2️⃣ Karena file ditaruh di akhir, pakai panjang sebelumnya sebagai index
          const fileIndex = updateKtp.length;

          // 3️⃣ Simpan juga ke personalData
          updatedData[index] = {
            ...updatedData[index],
            [field]: file, // ktp jadi array yang isinya file
            uploadKtp: true,
            ktpFileIndex: fileIndex,
            ktpName: file.name,
          };
        }
      }
    }

    // ----- Jika field bertipe teks -----
    else {
      const value = e.target.value;

      updatedData[index] = { ...updatedData[index], [field]: value };

      // Contoh validasi kosong
      updatedError[index] = {
        ...updatedError[index],
        [field]: value.trim() === "" ? `${field} tidak boleh kosong` : null,
      };
    }

    // ----- Commit state -----
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
        ktp: null,
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
        id: null,
        name: null,
        email: null,
        institution: null,
        work: null,
        faculty: null,
        studyProgram: null,
        nationalState: null,
        countryResidence: null,
        province: null,
        city: null,
        subdistrict: null,
        ward: null,
        postalCode: null,
        phoneNumber: null,
        facebook: null,
        whatsapp: null,
        instagram: null,
        twitter: null,
        address: null,
        ktp: null,
        isLeader: null,
      },
    ]);
  };
  const removeContributor = (index: number) => {
    if (personalData.length <= 1) {
      return;
    }
    const updatedData = personalData.filter((_, i) => i !== index);
    const updatedError = personalDataError.filter((_, i) => i !== index);

    setPersonalData(updatedData);
    setPersonalDataError(updatedError);
  };
  return {
    personalData,
    addContributor,
    handleChangePerson,
    validatePersonalData,
    personalDataError,
    setPersonalDataError,
    setPersonalData,
    removeContributor,
    updateKtp,
  };
};

export default usePersonalData;
