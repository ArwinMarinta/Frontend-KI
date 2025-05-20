import DetailDocument from "../../../../components/input/detailDocument";
import Field from "../../../../components/input/fieldInput";
import { claimOptions } from "../../../../data/indusDesign";
import { IndustrialDesignType } from "../../../../types/submissionType";

interface DocumentType {
  data: IndustrialDesignType | null | undefined;
}

const DocumentSubmissionIndutrialDesign = ({ data }: DocumentType) => {
  return (
    <div className="flex flex-col gap-6">
      <Field label="Judul Desain Industri" value={data?.titleDesign || "-"} name="fullname" type="text" placeholder="" readOnly />
      <Field label="Tipe Desain Industri" value={data?.type || "-"} name="fullname" type="text" placeholder="" readOnly />
      <div className="flex flex-col lg:flex-row gap-6">
        <Field label="Jenis Desain Industri" value={data?.typeDesign?.title || "-"} name="fullname" type="text" placeholder="" readOnly />
        <Field label="Sub-Jenis Desain Industri" value={data?.subTypeDesign?.title || "-"} name="fullname" type="text" placeholder="" readOnly />
      </div>

      <div className="flex flex-col gap-2">
        <label className="block mb-2 text-base font-medium">Klaim</label>
        <div className="flex flex-wrap gap-8">
          {claimOptions.map((option) => (
            <div key={option.id} className="flex items-center gap-2">
              <input type="checkbox" checked={data?.claim?.includes(option.value)} className="w-4 h-4 text-PRIMARY01 bg-gray-100 border-gray-300 rounded-md focus:ring-PRIMARY01 dark:focus:ring-PRIMARY01 dark:ring-offset-gray-800 focus:ring-1" readOnly />
              <label>{option.label}</label>
            </div>
          ))}
        </div>
      </div>

      <DetailDocument label="Tampak Perspektik" value={data?.looksPerspective || ""} name="fullname" placeholder="" readOnly />
      <DetailDocument label="Tampak Depan" value={data?.frontView || ""} name="fullname" placeholder="" readOnly />
      <DetailDocument label="Tampak Belakang" value={data?.backView || ""} name="fullname" placeholder="" readOnly />
      <DetailDocument label="Samping Kanan" value={data?.rightSideView || ""} name="fullname" placeholder="" readOnly />
      <DetailDocument label="Samping Kiri" value={data?.lefttSideView || ""} name="fullname" placeholder="" readOnly />
      <DetailDocument label="Tampak Atas" value={data?.topView || ""} name="fullname" placeholder="" readOnly />
      <DetailDocument label="Tampak Bawah" value={data?.downView || ""} name="fullname" placeholder="" readOnly />
      <DetailDocument label="Gambar Lainnya" value={data?.moreImages || ""} name="fullname" placeholder="" readOnly />
      <DetailDocument label="Surat Pengalihan Hak Desain Industri" value={data?.letterTransferDesignRights || ""} name="fullname" placeholder="" readOnly />
      <DetailDocument label="Surat Kepemilikan Desain Industri" value={data?.designOwnershipLetter || ""} name="fullname" placeholder="" readOnly />
    </div>
  );
};

export default DocumentSubmissionIndutrialDesign;
