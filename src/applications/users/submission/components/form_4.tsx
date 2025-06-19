import PrevButton from "./prevButton";
import Field from "../../../../components/input/fieldInput";
import { FormPersonalData } from "../../../../types/submissionType";
import FieldTextarea from "../../../../components/input/fieldTextArea";
import { FormSubmissionCopyright } from "../../../../types/copyright";
import { RootState } from "../../../../service/store";
import { useSelector } from "react-redux";
import SubmitButton from "./submitButton";
import { FormAdditionalBrand, FormSubmissionBrand } from "../../../../types/brandType";

export type FormStepProps = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  submissionType: string;
  personalData: FormPersonalData[];
  draftPatent?: File | null;
  handleSubmit: () => void;
  formCopyright?: FormSubmissionCopyright;
  formBrand?: FormSubmissionBrand;
  formAdditionalBrand?: FormAdditionalBrand[];
};

const Form_4 = ({ currentStep, setCurrentStep, submissionType, personalData, draftPatent, handleSubmit, formCopyright, formBrand, formAdditionalBrand }: FormStepProps) => {
  const { typeCopy, subTypeCopy } = useSelector((state: RootState) => state.landing.submissionType.copyright);

  const typeLabel = typeCopy?.find((item) => String(item.id) === String(formCopyright?.typeCreation))?.title ?? "-";
  const subtypeLabel = subTypeCopy?.find((item) => String(item.id) === String(formCopyright?.subTypeCreation))?.title ?? "-";

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center md:mt-20 mt-10 gap-6">
        <h2 className="text-2xl md:text-[32px] font-semibold">Review Pengajuan</h2>
        <div className="md:w-[60%] w-full">
          <p className="text-center mt-3">Silakan tinjau kembali detail pengajuan Anda sebelum mengirim. Pastikan semua informasi yang Anda isi sudah benar dan sesuai untuk meminimalisir kesalahan input yang dapat menghambat proses verifikasi atau persetujuan.</p>
        </div>
      </div>

      <div className="md:mt-20 mt-10 flex flex-col gap-6">
        {(submissionType === "Paten" || submissionType === "Desain Industri") && <Field label="Drat Review Pengajuan" value={draftPatent ? draftPatent.name : ""} name="twitter" type="text" placeholder="" readOnly />}
        {submissionType === "Hak Cipta" && (
          <div className="flex flex-col gap-6">
            <Field label="Judul Penelitian" value={formCopyright?.titleInvention ?? ""} name="twitter" type="text" placeholder="" readOnly />
            <div className="flex md:flex-row flex-col gap-6">
              <Field label="Jenis Ciptaan" value={typeLabel} name="twitter" type="text" placeholder="" readOnly />
              <Field label="Sub-Jenis Ciptaan" value={subtypeLabel} name="twitter" type="text" placeholder="" readOnly />
            </div>
            <div className="flex md:flex-row flex-col gap-6">
              <Field label="Negara Pertama Kali Diumumkan" value={formCopyright?.countryFirstAnnounced ?? ""} name="twitter" type="text" placeholder="" readOnly />
              <Field label="Kota Pertama Kali Diumumkan" value={formCopyright?.cityFirstAnnounced ?? ""} name="twitter" type="text" placeholder="" readOnly />
            </div>
            <Field label="Waktu Pertama Kali Diumumkan" value={formCopyright?.timeFirstAnnounced ?? ""} name="twitter" type="text" placeholder="" readOnly />
            {/* <Field label="Surat Pernyataan" value={formCopyright?.statementLetter ? formCopyright.statementLetter.name : ""} name="twitter" type="text" placeholder="" readOnly />
            <Field label="surat Pengalihan Hak Cipta" value={formCopyright?.letterTransferCopyright ? formCopyright.letterTransferCopyright.name : ""} name="twitter" type="text" placeholder="" readOnly /> */}
            {formCopyright?.exampleCreation instanceof File && <Field label="File Ciptaan" value={formCopyright.exampleCreation.name} name="fileName" type="text" placeholder="" readOnly />}

            {typeof formCopyright?.exampleCreation === "string" && <Field label="URL Ciptaan" value={formCopyright.exampleCreation} name="exampleCreation" type="text" placeholder="" readOnly />}
          </div>
        )}
        {submissionType === "Merek" && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              <div className="flex lg:flex-row flex-col gap-6">
                <Field label="Tipe Permohonan" value={formBrand?.applicationType ?? ""} name="twitter" type="text" placeholder="" readOnly />
                <Field label="Tipe Merek" value={formBrand?.brandType?.toString() ?? ""} name="twitter" type="text" placeholder="" readOnly />
              </div>

              <div className="flex lg:flex-row flex-col gap-6">
                <Field label="Nama Refrensi Label Merek" value={formBrand?.referenceName ?? "-"} name="twitter" type="text" placeholder="" readOnly />
                <Field label="Unsur Warna Dalam Label Merek" value={formBrand?.elementColor ?? "-"} name="twitter" type="text" placeholder="" readOnly />
              </div>
              <div className="flex lg:flex-row flex-col gap-6">
                <Field label="Disclaimer (Tidak dilindungin)" value={formBrand?.disclaimer ?? ""} name="twitter" type="text" placeholder="" readOnly />
                <Field label="Jenis Dokumen" value={formBrand?.documentType ?? ""} name="twitter" type="text" placeholder="" readOnly />
              </div>

              <div className="flex lg:flex-row flex-col gap-6">
                <Field label="Terjemahan Jika Menggunakan Bahasa Asing" value={formBrand?.translate ?? ""} name="twitter" type="text" placeholder="" readOnly />
                <Field label="Pengucapan Jika Menggunakan Huruf Non-Latin" value={formBrand?.pronunciation ?? ""} name="twitter" type="text" placeholder="" readOnly />
              </div>
              <FieldTextarea label="Dekripsi Label Merek" value={formBrand?.description ?? "-"} name="address" placeholder="" required row={4} readOnly />
              <FieldTextarea label="Dekripsi Label Merek" value={formBrand?.information ?? "-"} name="address" placeholder="" required row={4} readOnly />
              <Field label="Label Merek" value={formBrand?.labelBrand ? formBrand?.labelBrand.name : ""} name="twitter" type="text" placeholder="" readOnly />
              {/* <Field label="Upload File" value={formBrand?.fileUploade ? formBrand?.fileUploade.name : ""} name="twitter" type="text" placeholder="" readOnly /> */}
              <Field label="Tanda Tangan Permohonan" value={formBrand?.signature ? formBrand?.signature.name : ""} name="twitter" type="text" placeholder="" readOnly />
              {/* <Field label="Surat Keterangan UMKM" value={formBrand?.InformationLetter ? formBrand?.InformationLetter.name : ""} name="twitter" type="text" placeholder="" readOnly />
              <Field label="Surat Pernyataan UMKM" value={formBrand?.letterStatment ? formBrand?.letterStatment.name : ""} name="twitter" type="text" placeholder="" readOnly /> */}
            </div>
            <div className="flex flex-col ">
              <label className="block mb-2 text-base font-medium">Data Merek Tambahan</label>
              <div className="overflow-x-auto w-full mb-6">
                <table className="min-w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left border-b max-w-10">No</th>
                      <th className="px-4 py-2 text-left border-b ">Nama File</th>
                      <th className="px-4 py-2 text-left border-b ">Deskripsi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formAdditionalBrand?.map((item, index) => (
                      <tr key={index} className="bg-white hover:bg-gray-50 h-full">
                        <td className="px-4 py-2 border-b">{index + 1}</td>
                        <td className="px-4 py-2 border-b">{item.additionalFiles?.name ?? null}</td>
                        <td className="px-4 py-2 border-b">{item.additionalDescriptions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {submissionType === "Merek"}
        <div className="flex flex-col gap-8">
          {personalData.map((item, index) => (
            <div key={item.id} className="border p-6 rounded-md flex flex-col gap-6 border-PRIMARY01">
              <div className="flex flex-col lg:flex-row gap-6">
                <Field label={index === 0 ? "Ketua Pencipta" : `Kontributor ${index + 0}`} value={item.name} name="name" type="text" placeholder="" readOnly />
                <Field label="Email" value={item.email} name="email" type="email" placeholder="" readOnly />
              </div>
              <div className="flex flex-col lg:flex-row gap-6">
                <Field label="Instansi" value={item.institution} name="institution" type="text" placeholder="" readOnly />
                <Field label="Pekerjaan" value={item.work} name="work" type="text" placeholder="" readOnly />
              </div>
              <div className="flex flex-col lg:flex-row gap-6">
                <Field label="Instansi" value={item.faculty || ""} name="faculty" type="text" placeholder="" readOnly />
                <Field label="Pekerjaan" value={item.studyProgram || ""} name="studyProgram" type="text" placeholder="" readOnly />
              </div>
              <div className="flex flex-col lg:flex-row gap-6">
                <Field label="Negara Kebangsaan" value={item.nationalState} name="nationalState" type="text" placeholder="" readOnly />
                <Field label="Negara Tempat Tingggal" value={item.countryResidence} name="countryResidence" type="text" placeholder="" readOnly />
              </div>
              <div className="flex flex-col lg:flex-row gap-6">
                <Field label="Provinsi" value={item.province} name="province" type="text" placeholder="" readOnly />
                <Field label="Kota/Kabupaten" value={item.city} name="city" type="text" placeholder="" readOnly />
              </div>
              <div className="flex flex-col lg:flex-row gap-6">
                <Field label="Kecamatan" value={item.subdistrict} name="subdistrict " type="text" placeholder="" readOnly />
                <Field label="Kelurahan" value={item.ward} name="ward" type="text" placeholder="" readOnly />
              </div>
              <div className="flex flex-col lg:flex-row gap-6">
                <Field label="Kode Pos" value={item.postalCode} name="postalCode" type="text" placeholder="" readOnly />
                <Field label="Nomor Handphone" value={item.phoneNumber} name="phoneNumber" type="text" placeholder="" readOnly />
              </div>
              {submissionType === "Merek" && (
                <>
                  <div className="flex flex-col lg:flex-row gap-6">
                    <Field label="Facebook" value={item.facebook || ""} name="facebook" type="text" placeholder="" readOnly />
                    <Field label="Whatsapp" value={item.whatsapp || ""} name="whatsapp" type="text" placeholder="" readOnly />
                  </div>
                  <div className="flex flex-col lg:flex-row gap-6">
                    <Field label="Instagram" value={item.instagram || ""} name="instagram" type="text" placeholder="" readOnly />
                    <Field label="Twitter" value={item.twitter || ""} name="twitter" type="text" placeholder="" readOnly />
                  </div>
                </>
              )}

              <FieldTextarea label="Alamat" value={item.address || ""} name="address" placeholder="" required row={4} readOnly />
              <Field label="KTP" value={item.ktp ? (typeof item.ktp === "string" ? item.ktp : item.ktp.name) : ""} name="twitter" type="text" placeholder="" readOnly />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-20 w-full flex flex-row justify-end gap-6">
        <PrevButton onClick={() => setCurrentStep(currentStep - 1)} />
        <SubmitButton onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default Form_4;
