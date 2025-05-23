import { FormSubmissionCopyright, FormSubmissionCopyrightError } from "../../../../types/copyright";
import FieldDropdown from "../../../../components/input/FieldDropDown";
import Field from "../../../../components/input/fieldInput";
import FieldTextarea from "../../../../components/input/fieldTextArea";
import InputFile from "./field/InputFile";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../service/store";
import { useEffect } from "react";
import { getSubTypeCopyright, getTypeCopyright } from "../../../../service/actions/landingAction";
import NextButton from "./nextButton";

interface FormCopyrightProps {
  formCopyright?: FormSubmissionCopyright;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
  formCopyrightError?: FormSubmissionCopyrightError;
  handleNextStep: () => void;
}

const FormCopyright = ({ formCopyright, formCopyrightError, handleChange, handleNextStep }: FormCopyrightProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { typeCopy, subTypeCopy } = useSelector((state: RootState) => state.landing.submissionType.copyright);

  useEffect(() => {
    dispatch(getTypeCopyright());
  }, [dispatch]);

  useEffect(() => {
    if (formCopyright?.typeCreation) {
      dispatch(getSubTypeCopyright(formCopyright.typeCreation));
    }
  }, [dispatch, formCopyright?.typeCreation]);

  return (
    <>
      <div className="flex flex-col items-center lg:mt-20 mt-10">
        <h2 className="lg:text-[32px] font-semibold text-2xl">Dokumen Pengajuan</h2>
        <p className="text-justify mt-3 items-center">
          Lengkapi semua data pengajuan Anda agar dapat diproses dengan lancar.
          {/* <br /> */}
          Pastikan semua dokumen yang diperlukan telah diisi dengan benar dan lengkap.
          {/* <span className="text-justify"> Lengkapi semua data pengajuan Anda agar dapat diproses dengan lancar.</span>
          <span> Pastikan semua dokumen yang diperlukan telah diisi dengan benar dan lengkap.</span> */}
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:mt-24 mt-16">
        <Field label="Judul Ciptaan" value={formCopyright?.titleInvention || ""} name="titleInvention" type="text" placeholder="" need error={formCopyrightError?.titleInvention} onChange={handleChange} />

        <div>
          <div className="flex md:flex-row flex-col w-full gap-6">
            <FieldDropdown
              label="Jenis Hak Cipta"
              name="typeCreation"
              type="select"
              value={String(formCopyright?.typeCreation ?? null)}
              onChange={handleChange}
              options={
                typeCopy?.map((item) => ({
                  label: item.title,
                  value: item.id,
                })) ?? []
              }
              error={formCopyrightError?.typeCreation}
              need
            />
            <FieldDropdown
              label="Sub-Jenis Hak Cipta"
              name="subTypeCreation"
              type="select"
              value={String(formCopyright?.subTypeCreation ?? null)}
              onChange={handleChange}
              options={
                subTypeCopy?.map((item) => ({
                  label: item.title,
                  value: item.id,
                })) ?? []
              }
              error={formCopyrightError?.subTypeCreation}
              need
            />
          </div>
        </div>

        <div className="flex md:flex-row flex-col w-full gap-6">
          <Field label="Negara Pertama Kali Diumumkan" value={formCopyright?.countryFirstAnnounced || ""} name="countryFirstAnnounced" type="text" placeholder="" need error={formCopyrightError?.countryFirstAnnounced} onChange={handleChange} />
          <Field label="Kota Pertama Kali Diumumkan" value={formCopyright?.cityFirstAnnounced || ""} name="cityFirstAnnounced" type="text" placeholder="" need error={formCopyrightError?.cityFirstAnnounced} onChange={handleChange} />
        </div>

        <div className="w-full">
          <label htmlFor="startDate" className="block mb-2 text-base font-medium">
            Waktu Pertama Kali Diumumkan
          </label>
          <input
            type="date"
            id="timeFirstAnnounced"
            name="timeFirstAnnounced"
            value={formCopyright?.timeFirstAnnounced || ""}
            onChange={handleChange}
            className={`bg-gray-50 border ${formCopyrightError?.timeFirstAnnounced ? "border-RED01 ring-RED01 focus:ring-RED01 focus:border-RED01" : "border-BORDER01 focus:ring-PRIMARY01 focus:border-PRIMARY01"} text-base rounded-md block w-full p-2`}
          />
          {formCopyrightError?.timeFirstAnnounced && <p className="text-sm text-RED01 mt-1">Field Tidak Boleh Kosong!</p>}
        </div>

        <FieldTextarea label="Uraian Singkat Ciptaan" value={formCopyright?.briefDescriptionCreation || ""} name="briefDescriptionCreation" placeholder="" required row={4} onChange={handleChange} error={formCopyrightError?.briefDescriptionCreation} need />
        {/* <InputFile label="Surat Pernyataan" value={formCopyright?.statementLetter ?? null} name="statementLetter" required onChange={handleChange} error={formCopyrightError?.statementLetter} need />
        <InputFile label="Surat Pengalihan Hak Cipta" value={formCopyright?.letterTransferCopyright ?? null} name="letterTransferCopyright" required onChange={handleChange} error={formCopyrightError?.letterTransferCopyright} need /> */}
        <InputFile label="Contoh Ciptaan" value={formCopyright?.exampleCreation ?? null} name="exampleCreation" required onChange={handleChange} error={formCopyrightError?.exampleCreation} need />
      </div>
      <div className="mt-20 w-full flex-row gap-6 flex justify-end">
        <NextButton onClick={handleNextStep} />
      </div>
    </>
  );
};

export default FormCopyright;
