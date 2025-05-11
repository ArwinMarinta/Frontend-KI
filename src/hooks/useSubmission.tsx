import { useState } from "react";
// import { LabelBrand, PersonalData, SubmissionBrand, SubmissionPatent } from "../types/submissionType";

export const useSubmission = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [submissionType, setSubmissionType] = useState<"Hak Cipta" | "Paten" | "Merek" | "Desain Industri">("Hak Cipta");
  const [reviewSubmission, setReviewSubmission] = useState<string>("");
  // const [personalData, setPersonalData] = useState<PersonalData>({
  //   nama: "",
  //   email: "",
  //   instansi: "",
  //   pekerjaan: "",
  //   fakultas: "",
  //   prodi: "",
  //   negaraKebangsaan: "",
  //   negaraTempatTinggal: "",
  //   provinsi: "",
  //   kabupaten: "",
  //   kecamatan: "",
  //   kelurahan: "",
  //   kodePos: "",
  //   alamat: "",
  //   ktpPencipta: "",
  //   facebook: "",
  //   whatsapp: "",
  //   instagram: "",
  //   twitter: "",
  // });
  // const [submissionBrand, setSubmissionBrand] = useState<SubmissionBrand>({
  //   tipePermohonan: "",
  //   tipeMerek: "",
  //   namaRefrensiLabel: "",
  //   unsurWarnaLabel: "",
  //   terjemahanBahasaAsing: "",
  //   pengucapanHurufNonLatin: "",
  //   disclaimer: "",
  //   deskripsiMerek: "",
  //   jenisDokumen: "",
  //   keterangan: "",
  //   labelMerek: "",
  //   fileUnggahan: "",
  //   tandaTanganPermohonan: "",
  //   suratKeranganUmkm: "",
  //   suratPernyataanUmkm: "",
  //   labelBrand: [] as LabelBrand[],
  // });

  // const [labelBrand, setLabelBrand] = useState<LabelBrand>({
  //   labelTambahan: "",
  //   keterangan: "",
  //   tanggalUnggah: "",
  //   namaFile: "",
  //   ukuran: "",
  //   gambar: "",
  // });

  // const [submissionPatent, setSubmissionPatent] = useState<SubmissionPatent>({
  //   judulCiptaan: "",
  //   jenisCiptaan: "",
  //   subJenisCiptaan: "",
  //   negaraPertamaKali: "",
  //   kotaPertamaKali: "",
  //   waktuPertamaKali: "",
  //   uraianSingkatInvensi: "",
  //   suratPernyataan: "",
  //   suratPengalihanHakCipta: "",
  //   contohCiptaan: "",
  // });

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      return;
    }
  };

  return {
    currentStep,
    submissionType,
    reviewSubmission,
    // personalData,
    // submissionBrand,
    // labelBrand,
    // submissionPatent,
    setCurrentStep,
    setSubmissionType,
    setReviewSubmission,
    // setPersonalData,
    // setSubmissionPatent,
    // setLabelBrand,
    // setSubmissionBrand,
    handleNextStep,
  };
};
