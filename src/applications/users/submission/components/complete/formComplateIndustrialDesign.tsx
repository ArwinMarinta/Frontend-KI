import FieldDropdown from "../../../../../components/input/FieldDropDown";
import Field from "../../../../../components/input/fieldInput";
import { FormComplateIndustDesign, FormDesignSubmissionErrors } from "../../../../../types/submissionType";
import InputFile from "../field/InputFile";
import { claimOptions, designTypes } from "../../../../../data/indusDesign";
import useComplate from "../../hooks/useComplate";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../service/store";

interface FormComplateDesignProps {
  formIndustDesign: FormComplateIndustDesign;
  formIndustDesignError: FormDesignSubmissionErrors;
  handleChangeComplateIndusDesign: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmitComplateIndusDesign: () => void;
  handleClaimCheckboxChange: (label: string) => void;
}

const FormComplateIndustrialDesign = ({ formIndustDesign, formIndustDesignError, handleChangeComplateIndusDesign, handleSubmitComplateIndusDesign, handleClaimCheckboxChange }: FormComplateDesignProps) => {
  const { submissionType } = useComplate();
  const { typeDesign, subtypeDesain } = useSelector((state: RootState) => state.landing.submissionType.indusDesign);
  return (
    <>
      <div className="flex items-center h-24">
        <h1 className="text-center text-3xl w-full font-bold">Formulir Pendaftaran {submissionType}</h1>
      </div>
      <div className="flex flex-col gap-6">
        <Field label="Judul Desain Industri" value={formIndustDesign.titleDesign} name="titleDesign" type="text" placeholder="" need error={formIndustDesignError.titleDesign} onChange={handleChangeComplateIndusDesign} />
        <FieldDropdown
          label="Tipe Desain Industri"
          name="type"
          type="select"
          value={formIndustDesign.type?.toString() || ""}
          onChange={handleChangeComplateIndusDesign}
          options={
            designTypes?.map((item) => ({
              label: item.label,
              value: item.value,
            })) ?? []
          }
          error={formIndustDesignError.type}
          need
        />

        <div className="flex flex-row gap-6">
          <div className="flex flex-row w-full gap-6">
            <FieldDropdown
              label="Jenis Desain Industri"
              name="typeDesignId"
              type="select"
              value={formIndustDesign.typeDesignId?.toString() || ""}
              onChange={handleChangeComplateIndusDesign}
              options={
                typeDesign?.map((item) => ({
                  label: item.title,
                  value: item.id,
                })) ?? []
              }
              error={formIndustDesignError.typeDesignId}
              need
            />
            <FieldDropdown
              label="Sub-Jenis Desain Industri"
              name="subtypeDesignId"
              type="select"
              value={formIndustDesign.subtypeDesignId?.toString() || ""}
              onChange={handleChangeComplateIndusDesign}
              options={
                subtypeDesain?.map((item) => ({
                  label: item.title,
                  value: item.id,
                })) ?? []
              }
              error={formIndustDesignError.subtypeDesignId}
              need
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="block mb-2 text-base font-medium">
            Klaim
            <span className="text-RED01 ml-1">*</span>
          </label>

          <div className="flex flex-row gap-10">
            {claimOptions?.map((option) => (
              <label key={option.value} className="flex items-center gap-2">
                <input type="checkbox" value={option.value} className="w-4 h-4 text-PRIMARY01 bg-gray-100 border-gray-300 rounded-md  focus:ring-PRIMARY010 dark:focus:ring-PRIMARY01 dark:ring-offset-gray-800 focus:ring-1 " onChange={() => handleClaimCheckboxChange(option.label)} />
                {option.label}
              </label>
            ))}
          </div>
          {formIndustDesignError.claim && <p className="text-sm text-RED01 mt-2">Klaim Wajib Dipilih!</p>}
        </div>
        <InputFile label="Tampak Perspektif" value={formIndustDesign.looksPerspective} name="looksPerspective" required onChange={handleChangeComplateIndusDesign} error={formIndustDesignError.looksPerspective} need message="Format file harus berupa pdf, doc, dan docx. Max 20 MB" />
        <InputFile label="Tampak Depan" value={formIndustDesign.frontView} name="frontView" required onChange={handleChangeComplateIndusDesign} error={formIndustDesignError.frontView} need message="Format file harus berupa pdf, doc, dan docx. Max 20 MB" />
        <InputFile label="Tampak Belakang" value={formIndustDesign.backView} name="backView" required onChange={handleChangeComplateIndusDesign} error={formIndustDesignError.backView} need message="Format file harus berupa pdf, doc, dan docx. Max 20 MB" />
        <InputFile label="Tampak Samping Kanan" value={formIndustDesign.rightSideView} name="rightSideView" required onChange={handleChangeComplateIndusDesign} error={formIndustDesignError.rightSideView} need message="Format file harus berupa pdf, doc, dan docx. Max 20 MB" />
        <InputFile label="Tampak Samping Kiri" value={formIndustDesign.lefttSideView} name="lefttSideView" required onChange={handleChangeComplateIndusDesign} error={formIndustDesignError.lefttSideView} need message="Format file harus berupa pdf, doc, dan docx. Max 20 MB" />
        <InputFile label="Tampak Atas" value={formIndustDesign.topView} name="topView" required onChange={handleChangeComplateIndusDesign} error={formIndustDesignError.topView} need message="Format file harus berupa pdf, doc, dan docx. Max 20 MB" />
        <InputFile label="Tampak Bawah" value={formIndustDesign.downView} name="downView" required onChange={handleChangeComplateIndusDesign} error={formIndustDesignError.downView} need message="Format file harus berupa pdf, doc, dan docx. Max 20 MB" />
        <InputFile label="Gambar Lainnya" value={formIndustDesign.moreImages} name="moreImages" required onChange={handleChangeComplateIndusDesign} error={formIndustDesignError.moreImages} need message="Format file harus berupa pdf, doc, dan docx. Max 20 MB" />
        <InputFile
          label="Surat Pengalihan Hak Desain Industri"
          value={formIndustDesign.designOwnershipLetter}
          name="designOwnershipLetter"
          required
          onChange={handleChangeComplateIndusDesign}
          error={formIndustDesignError.designOwnershipLetter}
          need
          message="Format file harus berupa pdf, doc, dan docx. Max 20 MB"
        />
        <InputFile
          label="Surat Kepemilikan Desain Industri"
          value={formIndustDesign.letterTransferDesignRights}
          name="letterTransferDesignRights"
          required
          onChange={handleChangeComplateIndusDesign}
          error={formIndustDesignError.letterTransferDesignRights}
          need
          message="Format file harus berupa pdf, doc, dan docx. Max 20 MB"
        />

        <div className="flex justify-end mt-6">
          <button onClick={handleSubmitComplateIndusDesign} className="bg-PRIMARY01 px-6 py-2 text-white font-medium rounded-md cursor-pointer">
            Kirim
          </button>
        </div>
      </div>
    </>
  );
};

export default FormComplateIndustrialDesign;
