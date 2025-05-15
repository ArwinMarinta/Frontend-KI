import React, { useEffect } from "react";
import Field from "../../../../../components/input/fieldInput";
import { FormComplatePatenSubmission, FormComplatePatenSubmissionErrors } from "../../../../../types/submissionType";
import FieldDropdown from "../../../../../components/input/FieldDropDown";
import InputFile from "../field/InputFile";
import { Link } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { toSlug } from "../../../../../utils/toSlug";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../service/store";
import { getTypePaten } from "../../../../../service/actions/landingAction";

interface FormComplatePatentProps {
  submissionType: string;
  formComplatePaten: FormComplatePatenSubmission;
  formComplatePatenError: FormComplatePatenSubmissionErrors;
  handleChangeComplatePaten: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmitComplatePatent: () => void;
}

const FormComplatePatent = ({ submissionType, formComplatePaten, formComplatePatenError, handleChangeComplatePaten, handleSubmitComplatePatent }: FormComplatePatentProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { typePaten } = useSelector((state: RootState) => state.landing.submissionType.paten);
  useEffect(() => {
    dispatch(getTypePaten());
  }, [dispatch]);

  return (
    <>
      <div className="grid grid-cols-3 items-center h-24">
        <Link to={`/histori-pengajuan/${toSlug(submissionType)}`}>
          <button className="flex flex-row items-center gap-2 bg-GREY01 py-2 px-3 rounded-md">
            <IoArrowBackCircleOutline className="text-2xl" />
            <span className="text-base font-medium">Kembali</span>
          </button>
        </Link>

        <h1 className="text-center text-3xl w-full font-bold">Formulir Pendaftaran Paten</h1>
      </div>
      <div className="flex flex-col gap-6">
        <Field label="Judul Invensi" value={formComplatePaten.inventionTitle} name="inventionTitle" type="text" placeholder="" need error={!!formComplatePatenError.inventionTitle} onChange={handleChangeComplatePaten} />
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
              error={!!formComplatePatenError.patentTypeId}
              need
            />
            <Field label="Jumlah Klaim" value={formComplatePaten.numberClaims?.toString() || ""} name="numberClaims" type="text" placeholder="contoh: 1,2,3 dst." error={!!formComplatePatenError.numberClaims} onChange={handleChangeComplatePaten} need />
          </div>
        </div>
        <InputFile label="Klaim" value={formComplatePaten.claim} name="claim" required onChange={handleChangeComplatePaten} error={!!formComplatePatenError.claim} need />
        <InputFile label="Deskripsi" value={formComplatePaten.description} name="description" required onChange={handleChangeComplatePaten} error={!!formComplatePatenError.description} need />
        <InputFile label="Abstrak" value={formComplatePaten.abstract} name="abstract" required onChange={handleChangeComplatePaten} error={!!formComplatePatenError.abstract} need />
        <InputFile label="Gambar Invensi" value={formComplatePaten.inventionImage} name="inventionImage" required onChange={handleChangeComplatePaten} error={!!formComplatePatenError.inventionImage} need />
        <InputFile label="Surat Pernyataan Kepemilikan Invensi" value={formComplatePaten.statementInventionOwnership} name="statementInventionOwnership" required onChange={handleChangeComplatePaten} error={!!formComplatePatenError.statementInventionOwnership} need />
        <InputFile label="Surat Pengalihan Hak Invensi" value={formComplatePaten.letterTransferRightsInvention} name="letterTransferRightsInvention" required onChange={handleChangeComplatePaten} error={!!formComplatePatenError.letterTransferRightsInvention} need />

        <div className="flex justify-end mt-6">
          <button onClick={handleSubmitComplatePatent} className="bg-PRIMARY01 px-6 py-2 text-white font-medium rounded-md cursor-pointer">
            Kirim
          </button>
        </div>
      </div>
    </>
  );
};

export default FormComplatePatent;
