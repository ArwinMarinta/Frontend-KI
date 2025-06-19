import FormRevision from "./formRevision";
import { SubmissionProgress } from "../../../../../types/submissionType";
import { FormSubmissionCopyright, FormSubmissionCopyrightError } from "../../../../../types/copyright";
import Field from "../../../../../components/input/fieldInput";
import FieldDropdown from "../../../../../components/input/FieldDropDown";
import FieldTextarea from "../../../../../components/input/fieldTextArea";
import InputFile from "../field/InputFile";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../service/store";
interface FormRevisionProps {
  progresSubmission: SubmissionProgress[] | null;
  formCopyright?: FormSubmissionCopyright;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
  formCopyrightError?: FormSubmissionCopyrightError;
  handleUpdate: () => void;
  types?: string;
}
const RevisionCopyright = ({ progresSubmission, formCopyright, handleChange, formCopyrightError, handleUpdate, types }: FormRevisionProps) => {
  const { typeCopy, subTypeCopy } = useSelector((state: RootState) => state.landing.submissionType.copyright);
  const { detailSubmission } = useSelector((state: RootState) => state.submission);
  // console.log(formCopyright);
  return (
    <div className="flex flex-col">
      <div>
        <FormRevision progresSubmission={progresSubmission} />
        <div className="flex flex-col gap-6 lg:mt-24 mt-16">
          <Field label="Judul Ciptaan" value={formCopyright?.titleInvention || ""} name="titleInvention" type="text" placeholder="" need error={formCopyrightError?.titleInvention} onChange={handleChange} />

          <div>
            <div className="flex md:flex-row flex-col w-full gap-6">
              <FieldDropdown
                label="Jenis Hak Cipta"
                name="typeCreation"
                type="select"
                value={formCopyright?.typeCreation?.toString() || ""}
                onChange={handleChange}
                options={
                  typeCopy?.map((item) => ({
                    label: item.title,
                    value: item.id.toString(),
                  })) ?? []
                }
                error={formCopyrightError?.typeCreation}
                need
              />
              <FieldDropdown
                label="Sub-Jenis Hak Cipta"
                name="subTypeCreation"
                type="select"
                value={formCopyright?.subTypeCreation?.toString() || ""}
                onChange={handleChange}
                options={
                  subTypeCopy?.map((item) => ({
                    label: item.title,
                    value: item.id.toString(),
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
          <InputFile
            label="Surat Pernyataan"
            value={formCopyright?.statementLetter ?? null}
            name="statementLetter"
            required
            onChange={handleChange}
            // error={formCopyrightError?.statementLetter}
            need
            message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
            edite={types}
            url={detailSubmission?.submission?.copyright?.statementLetter}
          />
          <InputFile
            label="Surat Pengalihan Hak Cipta"
            value={formCopyright?.letterTransferCopyright ?? null}
            name="letterTransferCopyright"
            required
            onChange={handleChange}
            // error={formCopyrightError?.letterTransferCopyright}
            need
            message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
            edite={types}
            url={detailSubmission?.submission?.copyright?.statementLetter}
          />
          <InputFile
            label="Contoh Ciptaan"
            value={formCopyright?.exampleCreation ?? null}
            name="exampleCreation"
            required
            onChange={handleChange}
            // error={formCopyrightError?.exampleCreation}
            need
            message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
            edite={types}
            url={detailSubmission?.submission?.copyright?.statementLetter}
          />
        </div>
        <div className="flex justify-end mt-16">
          <button onClick={handleUpdate} className="bg-PRIMARY01 px-4 py-2 flex flex-row items-center  gap-2 text-white font-medium rounded-md cursor-pointer">
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
};

export default RevisionCopyright;
