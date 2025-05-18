import DetailDocument from "../../../../components/input/detailDocument";
import Field from "../../../../components/input/fieldInput";
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
        <Field label="Jenis Desain Industri" value={data?.typeDesign || "-"} name="fullname" type="text" placeholder="" readOnly />
        <Field label="Sub-Jenis Desain Industri" value={String(data?.subTypeDesign || "-")} name="fullname" type="text" placeholder="" readOnly />
      </div>

      <div className="flex flex-col gap-2">
        <label className="">Klaim</label>
        <div className="flex flex-row gap-28">
          <div className="flex flex-row items-center gap-2">
            <input type="checkbox" checked={true} className="w-4 h-4 text-PRIMARY01 bg-gray-100 border-gray-300 rounded-md focus:ring-PRIMARY010 dark:focus:ring-PRIMARY01 dark:ring-offset-gray-800 focus:ring-1" readOnly />
            <label>Bentuk</label>
          </div>
          <div className="flex flex-row items-center gap-2">
            <input type="checkbox" checked={true} className="w-4 h-4 text-PRIMARY01 bg-gray-100 border-gray-300 rounded-md focus:ring-PRIMARY010 dark:focus:ring-PRIMARY01 dark:ring-offset-gray-800 focus:ring-1" readOnly />
            <label>Bentuk</label>
          </div>
          <div className="flex flex-row items-center gap-2">
            <input type="checkbox" checked={true} className="w-4 h-4 text-PRIMARY01 bg-gray-100 border-gray-300 rounded-md focus:ring-PRIMARY010 dark:focus:ring-PRIMARY01 dark:ring-offset-gray-800 focus:ring-1" readOnly />
            <label>Bentuk</label>
          </div>
          <div className="flex flex-row items-center gap-2">
            <input type="checkbox" checked={true} className="w-4 h-4 text-PRIMARY01 bg-gray-100 border-gray-300 rounded-md focus:ring-PRIMARY010 dark:focus:ring-PRIMARY01 dark:ring-offset-gray-800 focus:ring-1" readOnly />
            <label>Bentuk</label>
          </div>
        </div>
      </div>

      <DetailDocument label="Tampak Perspektik" value={data?.looksPerspective || ""} name="fullname" type="text" placeholder="" readOnly />
      <DetailDocument label="Tampak Depan" value={data?.frontView || ""} name="fullname" type="text" placeholder="" readOnly />
      <DetailDocument label="Tampak Belakang" value={data?.backView || ""} name="fullname" type="text" placeholder="" readOnly />
      <DetailDocument label="Samping Kanan" value={data?.rightSideView || ""} name="fullname" type="text" placeholder="" readOnly />
      <DetailDocument label="Samping Kiri" value={data?.lefttSideView || ""} name="fullname" type="text" placeholder="" readOnly />
      <DetailDocument label="Tampak Atas" value={data?.topView || ""} name="fullname" type="text" placeholder="" readOnly />
      <DetailDocument label="Tampak Bawah" value={data?.downView || ""} name="fullname" type="text" placeholder="" readOnly />
      <DetailDocument label="Gambar Lainnya" value={data?.moreImages || ""} name="fullname" type="text" placeholder="" readOnly />
      <DetailDocument label="Surat Pengalihan Hak Desain Industri" value={data?.letterTransferDesignRights || ""} name="fullname" type="text" placeholder="" readOnly />
      <DetailDocument label="Surat Kepemilikan Desain Industri" value={data?.designOwnershipLetter || ""} name="fullname" type="text" placeholder="" readOnly />
    </div>
  );
};

export default DocumentSubmissionIndutrialDesign;
