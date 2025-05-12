import NextButton from "./nextButton";
import PrevButton from "./prevButton";
import Field from "../../../../components/input/fieldInput";
import { FormPersonalData } from "../../../../types/submissionType";
import FieldTextarea from "../../../../components/input/fieldTextArea";
import { FormSubmissionCopyright } from "../../../../types/copyright";
import { RootState } from "../../../../service/store";
import { useSelector } from "react-redux";

export type FormStepProps = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  submissionType: string;
  personalData: FormPersonalData[];
  draftPatent?: File | null;
  handleSubmit: () => void;
  formCopyright?: FormSubmissionCopyright;
  // handleNextStep: () => void;
};

const Form_4 = ({ currentStep, setCurrentStep, submissionType, personalData, draftPatent, handleSubmit, formCopyright }: FormStepProps) => {
  const { type, subtype } = useSelector((state: RootState) => state.landing.submissionType.copyright);

  const typeLabel = type?.find((item) => String(item.id) === String(formCopyright?.typeCreation))?.title ?? "-";
  const subtypeLabel = subtype?.find((item) => String(item.id) === String(formCopyright?.subTypeCreation))?.title ?? "-";

  return (
    <div className="flex flex-col">
      <div>
        <div className="flex flex-col items-center mt-20">
          <h2 className="text-[32px] font-semibold">Review Formulir Pengajuan</h2>
          <p className="text-center mt-3">
            Silakan tinjau kembali detail pengajuan Anda sebelum mengirim. <br />
            Pastikan semua informasi yang Anda isi sudah benar dan sesuai untuk <br /> meminimalisir kesalahan input yang dapat menghambat proses verifikasi atau persetujuan.
          </p>
        </div>
      </div>

      <div className="mt-20 flex flex-col gap-10">
        <Field label="Jenis Pengajuan" value={submissionType} name="faculty" type="text" placeholder="" readOnly />

        {submissionType === "Paten" || (submissionType === "Desain Industri" && <Field label="Drat Review Pengajuan" value={draftPatent ? draftPatent.name : ""} name="twitter" type="text" placeholder="" readOnly />)}
        {submissionType === "Hak Cipta" && (
          <div className="flex flex-col gap-6">
            <Field label="Judul Penelitian" value={formCopyright?.titleInvention ?? ""} name="twitter" type="text" placeholder="" readOnly />
            <div className="flex flex-row gap-6">
              <Field label="Jenis Ciptaan" value={typeLabel} name="twitter" type="text" placeholder="" readOnly />
              <Field label="Sub-Jenis Ciptaan" value={subtypeLabel} name="twitter" type="text" placeholder="" readOnly />
            </div>
            <div className="flex flex-row gap-6">
              <Field label="Negara Pertama Kali Diumumkan" value={formCopyright?.countryFirstAnnounced ?? ""} name="twitter" type="text" placeholder="" readOnly />
              <Field label="Kota Pertama Kali Diumumkan" value={formCopyright?.cityFirstAnnounced ?? ""} name="twitter" type="text" placeholder="" readOnly />
            </div>
            <Field label="Waktu Pertama Kali Diumumkan" value={formCopyright?.timeFirstAnnounced ?? ""} name="twitter" type="text" placeholder="" readOnly />
            <Field label="Surat Pernyataan" value={formCopyright?.statementLetter ? formCopyright.statementLetter.name : ""} name="twitter" type="text" placeholder="" readOnly />
            <Field label="surat Pengalihan Hak Cipta" value={formCopyright?.letterTransferCopyright ? formCopyright.letterTransferCopyright.name : ""} name="twitter" type="text" placeholder="" readOnly />
            <Field label="Contoh Ciptaan" value={formCopyright?.exampleCreation ? formCopyright.exampleCreation.name : ""} name="twitter" type="text" placeholder="" readOnly />
          </div>
        )}

        {submissionType === "Merek"}
        <div className="flex flex-col gap-8">
          {personalData.map((item, index) => (
            <div key={item.id} className="border p-6 rounded-md flex flex-col gap-4 border-PRIMARY01">
              <div className="flex flex-col lg:flex-row lg:gap-6">
                <Field label={index === 0 ? "Ketua Pencipta" : `Kontributor ${index + 0}`} value={item.name} name="name" type="text" placeholder="" readOnly />
                <Field label="Email" value={item.email} name="email" type="email" placeholder="" readOnly />
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-6">
                <Field label="Instansi" value={item.institution} name="institution" type="text" placeholder="" readOnly />
                <Field label="Pekerjaan" value={item.work} name="work" type="text" placeholder="" readOnly />
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-6">
                <Field label="Instansi" value={item.faculty || ""} name="faculty" type="text" placeholder="" readOnly />
                <Field label="Pekerjaan" value={item.studyProgram || ""} name="studyProgram" type="text" placeholder="" readOnly />
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-6">
                <Field label="Negara Kebangsaan" value={item.nationalState} name="nationalState" type="text" placeholder="" readOnly />
                <Field label="Negara Tempat Tingggal" value={item.countryResidence} name="countryResidence" type="text" placeholder="" readOnly />
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-6">
                <Field label="Provinsi" value={item.province} name="province" type="text" placeholder="" readOnly />
                <Field label="Kota/Kabupaten" value={item.city} name="city" type="text" placeholder="" readOnly />
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-6">
                <Field label="Kecamatan" value={item.subdistrict} name="subdistrict " type="text" placeholder="" readOnly />
                <Field label="Kelurahan" value={item.ward} name="ward" type="text" placeholder="" readOnly />
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-6">
                <Field label="Kode Pos" value={item.postalCode} name="postalCode" type="text" placeholder="" readOnly />
                <Field label="Nomor Handphone" value={item.phoneNumber} name="phoneNumber" type="text" placeholder="" readOnly />
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-6">
                <Field label="Facebook" value={item.facebook || ""} name="facebook" type="text" placeholder="" readOnly />
                <Field label="Whatsapp" value={item.whatsapp || ""} name="whatsapp" type="text" placeholder="" readOnly />
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-6">
                <Field label="Instagram" value={item.instagram || ""} name="instagram" type="text" placeholder="" readOnly />
                <Field label="Twitter" value={item.twitter || ""} name="twitter" type="text" placeholder="" readOnly />
              </div>

              <FieldTextarea label="Alamat" value={item.address} name="address" placeholder="" required row={4} readOnly />
              <Field label="Twitter" value={item.ktp ? item.ktp.name : ""} name="twitter" type="text" placeholder="" readOnly />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-20 w-full flex flex-row justify-end gap-6">
        <PrevButton onClick={() => setCurrentStep(currentStep - 1)} />
        <NextButton onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default Form_4;
