import React from "react";
import BackButton from "../../../../../components/button/backButton";
import Field from "../../../../../components/input/fieldInput";
import { FormComplatePatenSubmission, FormComplatePatenSubmissionErrors } from "../../../../../types/submissionType";
import FieldDropdown from "../../../../../components/input/FieldDropDown";
import { brandClassOptions } from "../../../../../data/brand";
import InputFile from "../field/InputFile";

interface FormComplatePatentProps {
  formComplatePaten: FormComplatePatenSubmission;
  formComplatePatenError: FormComplatePatenSubmissionErrors;
  handleChangeComplatePaten: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const FormComplatePatent = ({ formComplatePaten, formComplatePatenError, handleChangeComplatePaten }: FormComplatePatentProps) => {
  return (
    <>
      <div className="grid grid-cols-3 items-center h-24">
        <div>
          <BackButton url={"/histori-pengajuan"} />
        </div>
        <h1 className="text-center text-3xl w-full font-bold">Progress Pengajuan Hak Paten</h1>
      </div>
      <form className="flex flex-col gap-6">
        <Field label="Judul Invensi" value={formComplatePaten.inventionTitle} name="titleInvention" type="text" placeholder="" need error={!!formComplatePatenError.inventionTitle} onChange={handleChangeComplatePaten} />
        <div className="flex flex-row gap-6">
          <div className="flex flex-row w-full gap-6">
            <FieldDropdown
              label="Jenis Paten"
              name="patentTypeId"
              type="select"
              value={formComplatePaten.patentTypeId?.toString() || ""}
              onChange={handleChangeComplatePaten}
              options={
                brandClassOptions?.map((item) => ({
                  label: item.label,
                  value: item.value,
                })) ?? []
              }
              error={!!formComplatePatenError.patentTypeId}
              need
            />
            <Field label="Jumlah Klaim" value={formComplatePaten.numberClaims?.toString() || ""} name="numberClaims" type="text" placeholder="contoh: 1,2,3 dst." error={!!formComplatePatenError.numberClaims} onChange={handleChangeComplatePaten} />
          </div>
        </div>
        <InputFile label="Klaim" value={formComplatePaten.claim} name="claim" required onChange={handleChangeComplatePaten} error={!!formComplatePatenError.claim} need />
        <InputFile label="Deskripsi" value={formComplatePaten.description} name="description" required onChange={handleChangeComplatePaten} error={!!formComplatePatenError.description} need />
        <InputFile label="Abstrak" value={formComplatePaten.abstract} name="abstract" required onChange={handleChangeComplatePaten} error={!!formComplatePatenError.abstract} need />
        <InputFile label="Gambar Invensi" value={formComplatePaten.inventionImage} name="inventionImage" required onChange={handleChangeComplatePaten} error={!!formComplatePatenError.inventionImage} need />
        <InputFile label="Surat Pernyataan Kepemilikan Invensi" value={formComplatePaten.statementInventionOwnership} name="statementInventionOwnership" required onChange={handleChangeComplatePaten} error={!!form} need />
        <InputFile label="Surat Pengalihan Hak Invensi" value={formComplatePaten.le} name="labelBrand" required onChange={handleChangeComplatePaten} error={!!formComplatePatenError.entirePatentDocument} need />
        <InputFile label="Label Merek" value={formComplatePaten.entirePatentDocument} name="labelBrand" required onChange={handleChangeComplatePaten} error={!!formComplatePatenError.entirePatentDocument} need />
      </form>
    </>
  );
};

export default FormComplatePatent;
