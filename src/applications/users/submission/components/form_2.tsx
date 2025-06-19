import { FormPersonalData, PersonalDataError } from "../../../../types/submissionType";
import Field from "../../../../components/input/fieldInput";
import FieldTextarea from "../../../../components/input/fieldTextArea";
import InputFile from "./field/InputFile";
import NextButton from "./nextButton";
import { IoAddCircleSharp } from "react-icons/io5";
import PrevButton from "./prevButton";

export type FormStepProps = {
  submissionType: string;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  personalData: FormPersonalData[];
  // setPersonalData: React.Dispatch<React.SetStateAction<FormPersonalData[]>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, field: keyof FormPersonalData) => void;
  addContributor: () => void;
  removeContributor?: (id: number) => void;
  deleteContributor?: (id: number | null) => void;
  handleNextStep: () => void;
  error: PersonalDataError[];
  types?: string;
  update?: boolean;
};

const Form_2 = ({ submissionType, currentStep, setCurrentStep, personalData, handleChange, addContributor, removeContributor, handleNextStep, error, types, deleteContributor, update = false }: FormStepProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center md:mt-20 mt-10 gap-6">
        <h2 className="text-[32px] font-semibold">Data Diri</h2>
        <div className="md:w-[60%] w-full">
          <p className="text-center mt-3 flex flex-col items-center w-full">Silakan mengisi data diri Anda untuk proses pengajuan Kekayaan Intelektual. Pastikan informasi yang diberikan akurat dan lengkap. Anda juga dapat menambahkan pencipta lainnya jika pengajuan dilakukan secara kolaboratif.</p>
        </div>
      </div>

      <div className="flex flex-col gap-8 md:mt-24 mt-16">
        {personalData.map((item, index) => (
          <>
            <div key={index} className="border p-6 rounded-md flex flex-col gap-4 border-PRIMARY01">
              <div className="flex flex-col lg:flex-row lg:gap-6 gap-4">
                <Field label={index === 0 ? "Ketua Pencipta" : `Kontributor ${index + 0}`} value={item.name} name="name" type="text" placeholder="" onChange={(e) => handleChange(e, index, "name")} error={error[index]?.name} need />
                <Field label="Email" value={item.email} name="email" type="email" placeholder="" onChange={(e) => handleChange(e, index, "email")} error={error[index]?.email} need />
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-6 gap-4">
                <Field label="Instansi" value={item.institution} name="institution" type="text" placeholder="" onChange={(e) => handleChange(e, index, "institution")} error={error[index]?.institution} need />
                <Field label="Pekerjaan" value={item.work} name="work" type="text" placeholder="" onChange={(e) => handleChange(e, index, "work")} error={error[index]?.work} need />
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-6 gap-4">
                <Field label="Fakultas" value={item.faculty || ""} name="faculty" type="text" placeholder="strip '-' jika bukan berasal dari ITK" onChange={(e) => handleChange(e, index, "faculty")} error={error[index]?.faculty} need />
                <Field label="Prodi" value={item.studyProgram || ""} name="studyProgram" type="text" placeholder="strip '-' jika bukan berasal dari ITK" onChange={(e) => handleChange(e, index, "studyProgram")} error={error[index]?.studyProgram} need />
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-6 gap-4">
                <Field label="Negara Kebangsaan" value={item.nationalState} name="nationalState" type="text" placeholder="" onChange={(e) => handleChange(e, index, "nationalState")} error={error[index]?.nationalState} need />
                <Field label="Negara Tempat Tingggal" value={item.countryResidence} name="countryResidence" type="text" placeholder="" onChange={(e) => handleChange(e, index, "countryResidence")} error={error[index]?.countryResidence} need />
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-6 gap-4">
                <Field label="Provinsi" value={item.province} name="province" type="text" placeholder="" onChange={(e) => handleChange(e, index, "province")} error={error[index]?.province} need />
                <Field label="Kota/Kabupaten" value={item.city} name="city" type="text" placeholder="" onChange={(e) => handleChange(e, index, "city")} error={error[index]?.city} need />
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-6 gap-4">
                <Field label="Kecamatan" value={item.subdistrict} name="subdistrict" type="text" placeholder="" onChange={(e) => handleChange(e, index, "subdistrict")} error={error[index]?.subdistrict} need />
                <Field label="Kelurahan" value={item.ward} name="ward" type="text" placeholder="" onChange={(e) => handleChange(e, index, "ward")} error={error[index]?.ward} need />
              </div>
              <div className="flex flex-col lg:flex-row lg:gap-6 gap-4">
                <Field label="Kode Pos" value={item.postalCode} name="postalCode" type="text" placeholder="" onChange={(e) => handleChange(e, index, "postalCode")} error={error[index]?.postalCode} need />
                <Field
                  label="Nomor Handphone"
                  value={item.phoneNumber}
                  name="phoneNumber"
                  type="tel"
                  placeholder=""
                  onChange={(e) => {
                    const val = e.target.value;
                    // Hanya izinkan angka dan panjang 10-15
                    if (/^\d{0,15}$/.test(val)) {
                      handleChange(e, index, "phoneNumber");
                    }
                  }}
                  error={error[index]?.phoneNumber}
                  need
                />
              </div>
              {submissionType === "Merek" && (
                <>
                  <div className="flex flex-col lg:flex-row lg:gap-6 gap-4">
                    <Field label="Facebook" value={item.facebook || ""} name="facebook" type="text" placeholder="" onChange={(e) => handleChange(e, index, "facebook")} error={error[index]?.facebook} />
                    <Field
                      label="Whatsapp"
                      value={item.whatsapp || ""}
                      name="whatsapp"
                      type="tel"
                      placeholder=""
                      onChange={(e) => {
                        const val = e.target.value;
                        // Hanya izinkan angka dan panjang 10-15
                        if (/^\d{0,15}$/.test(val)) {
                          handleChange(e, index, "whatsapp");
                        }
                      }}
                      error={error[index]?.whatsapp}
                    />
                  </div>
                  <div className="flex flex-col lg:flex-row lg:gap-6 gap-4">
                    <Field label="Instagram" value={item.instagram || ""} name="instagram" type="text" placeholder="" onChange={(e) => handleChange(e, index, "instagram")} error={error[index]?.instagram} />
                    <Field label="Twitter" value={item.twitter || ""} name="twitter" type="text" placeholder="" onChange={(e) => handleChange(e, index, "twitter")} error={error[index]?.twitter} />
                  </div>
                </>
              )}

              <FieldTextarea label="Alamat" value={item.address || ""} name="address" placeholder="" required row={4} onChange={(e) => handleChange(e, index, "address")} error={error[index]?.address} need />
              <InputFile
                label="KTP"
                value={item.ktp instanceof File ? item.ktp : undefined}
                name={`ktp_${index}`}
                required
                onChange={(e) => handleChange(e, index, "ktp")}
                error={error[index]?.ktp}
                need
                message="Format file harus berupa pdf. Max 20 MB"
                accept=".pdf"
                url={item.ktpName}
                edite={types}
              />

              {personalData.length > 1 && index !== 0 && (
                <div className="flex justify-end mt-10">
                  <button
                    onClick={() => {
                      if (item?.id === null) {
                        removeContributor?.(index);
                        // deleteContributor?.(item.id);
                      } else {
                        deleteContributor?.(item.id);
                      }
                    }}
                    className="bg-RED01 py-1 px-4 text-white rounded-md"
                  >
                    Hapus
                  </button>
                </div>
              )}
            </div>
          </>
        ))}
      </div>

      <div className="mt-4 flex justify-start">
        <button type="button" onClick={addContributor} className="flex flex-row items-center gap-2 px-2 py-2 active:bg-gray-100 rounded-md">
          <IoAddCircleSharp className="md:text-3xl text-xl text-PRIMARY01" />
          <span className="text-PRIMARY01 font-bold md:text-xl text-lg">Tambah Pencipta</span>
        </button>
      </div>

      <div className="mt-20 w-full flex flex-row md:justify-end justify-center gap-6">
        <PrevButton onClick={() => setCurrentStep(currentStep - 1)} />
        <NextButton onClick={handleNextStep} type={update} />
      </div>
    </div>
  );
};

export default Form_2;
