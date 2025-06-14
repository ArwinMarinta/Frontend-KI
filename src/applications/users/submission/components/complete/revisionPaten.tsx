import React from "react";
import { FormComplatePatenSubmission, FormComplatePatenSubmissionErrors, SubmissionProgress } from "../../../../../types/submissionType";
import FormRevision from "./formRevision";
import InputFile from "../field/InputFile";
import Field from "../../../../../components/input/fieldInput";
import FieldDropdown from "../../../../../components/input/FieldDropDown";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../service/store";

interface FormComplatePatentProps {
  progresSubmission: SubmissionProgress[] | null;
  formComplatePaten: FormComplatePatenSubmission;
  formComplatePatenError: FormComplatePatenSubmissionErrors;
  handleChangeComplatePaten: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmitComplatePatent: () => void;
  types?: string;
}

const RevisionPaten = ({ progresSubmission, formComplatePaten, formComplatePatenError, handleChangeComplatePaten, handleSubmitComplatePatent, types }: FormComplatePatentProps) => {
  const { typePaten } = useSelector((state: RootState) => state.landing.submissionType.paten);
  const { detailSubmission } = useSelector((state: RootState) => state.submission);
  return (
    <div className="flex flex-col gap-6">
      <div>
        <FormRevision progresSubmission={progresSubmission} />
      </div>
      <div className="flex flex-col gap-6">
        <Field label="Judul Invensi" value={formComplatePaten.inventionTitle} name="inventionTitle" type="text" placeholder="" need error={formComplatePatenError.inventionTitle} onChange={handleChangeComplatePaten} />
        <div className="flex flex-row gap-6">
          <div className="flex flex-row w-full gap-6">
            <FieldDropdown
              label="Jenis Paten"
              name="patentTypeId"
              type="select"
              value={formComplatePaten.patentTypeId?.toString() || ""}
              onChange={handleChangeComplatePaten}
              options={
                typePaten?.map((item) => ({
                  label: item.title,
                  value: item.id,
                })) ?? []
              }
              error={formComplatePatenError.patentTypeId}
              need
            />
            <Field label="Jumlah Klaim" value={formComplatePaten.numberClaims?.toString() || ""} name="numberClaims" type="text" placeholder="contoh: 1,2,3 dst." error={formComplatePatenError.numberClaims} onChange={handleChangeComplatePaten} need />
          </div>
        </div>
        <InputFile label="Klaim" value={formComplatePaten.claim} name="claim" required onChange={handleChangeComplatePaten} error={formComplatePatenError.claim} need message="Format file harus berupa pdf, dox, atau docx. Max 20MB" edite={types} url={detailSubmission?.submission?.patent?.claim} />
        <InputFile
          label="Deskripsi"
          value={formComplatePaten.description}
          name="description"
          required
          onChange={handleChangeComplatePaten}
          error={formComplatePatenError.description}
          need
          message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
          edite={types}
          url={detailSubmission?.submission?.patent?.description}
        />
        <InputFile
          label="Abstrak"
          value={formComplatePaten.abstract}
          name="abstract"
          required
          onChange={handleChangeComplatePaten}
          error={formComplatePatenError.abstract}
          need
          message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
          edite={types}
          url={detailSubmission?.submission?.patent?.abstract}
        />
        <InputFile
          label="Gambar Invensi"
          value={formComplatePaten.inventionImage}
          name="inventionImage"
          required
          onChange={handleChangeComplatePaten}
          error={formComplatePatenError.inventionImage}
          need
          message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
          edite={types}
          url={detailSubmission?.submission?.patent?.inventionImage}
        />
        <InputFile
          label="Surat Pernyataan Kepemilikan Invensi"
          value={formComplatePaten.statementInventionOwnership}
          name="statementInventionOwnership"
          required
          onChange={handleChangeComplatePaten}
          error={formComplatePatenError.statementInventionOwnership}
          need
          message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
          edite={types}
          url={detailSubmission?.submission?.patent?.statementInventionOwnership}
        />
        <InputFile
          label="Surat Pengalihan Hak Invensi"
          value={formComplatePaten.letterTransferRightsInvention}
          name="letterTransferRightsInvention"
          required
          onChange={handleChangeComplatePaten}
          error={formComplatePatenError.letterTransferRightsInvention}
          need
          message="Format file harus berupa pdf, dox, atau docx. Max 20MB"
          edite={types}
          url={detailSubmission?.submission?.patent?.letterTransferRightsInvention}
        />

        <div className="flex justify-end mt-6">
          <button onClick={handleSubmitComplatePatent} className="bg-PRIMARY01 px-6 py-2 text-white font-medium rounded-md cursor-pointer">
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
};

export default RevisionPaten;
