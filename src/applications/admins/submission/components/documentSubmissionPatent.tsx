import DetailDocument from "../../../../components/input/detailDocument";
import Field from "../../../../components/input/fieldInput";
import { PatentType } from "../../../../types/submissionType";

interface DocumentType {
  data: PatentType | null | undefined;
}

const DocumentSubmission = ({ data }: DocumentType) => {
  return (
    <div className="flex flex-col gap-6">
      <Field label="Judul Invensi" value={data?.inventionTitle || "-"} name="fullname" type="text" placeholder="" readOnly />
      <div className="flex flex-col lg:flex-row gap-6">
        <Field label="Jenis Paten" value={data?.patentType || "-"} name="fullname" type="text" placeholder="" readOnly />
        <Field label="Jumlah Klaim" value={String(data?.numberClaims || "-")} name="fullname" type="text" placeholder="" readOnly />
      </div>
      <DetailDocument label="Dokumen Paten Keseluruhan (Draft)" value={data?.draftPatentApplicationFile || ""} name="fullname" type="text" placeholder="" readOnly />
      <DetailDocument label="Deskripsi" value={data?.description || ""} name="fullname" type="text" placeholder="" readOnly />
      <DetailDocument label="Klaim" value={data?.claim || ""} name="fullname" type="text" placeholder="" readOnly />
      <DetailDocument label="Abstrak" value={data?.abstract || ""} name="fullname" type="text" placeholder="" readOnly />
      <DetailDocument label="Gambar Invensi" value={data?.abstract || ""} name="fullname" type="text" placeholder="" readOnly />
      <DetailDocument label="Surat Pernyataan Kepemilikan Invensi" value={data?.statementInventionOwnership || ""} name="fullname" type="text" placeholder="" readOnly />
      <DetailDocument label="Surat Pengalihan Hak Atas Invensi" value={data?.letterTransferRightsInvention || ""} name="fullname" type="text" placeholder="" readOnly />
    </div>
  );
};

export default DocumentSubmission;
