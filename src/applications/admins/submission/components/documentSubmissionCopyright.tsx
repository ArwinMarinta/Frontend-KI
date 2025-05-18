import { SubmissionCopyrightType } from "../../../../types/submissionType";
import Field from "../../../../components/input/fieldInput";
import DetailDocument from "../../../../components/input/detailDocument";
import FieldTextarea from "../../../../components/input/fieldTextArea";

interface DocumentType {
  data: SubmissionCopyrightType | null | undefined;
}

const DocumentSubmissionCopyright = ({ data }: DocumentType) => {
  return (
    <div className="flex flex-col gap-6">
      <Field label="Judul Ciptaan" value={data?.titleInvention || "-"} name="fullname" type="text" placeholder="" readOnly />
      <div className="flex flex-col lg:flex-row gap-6">
        <Field label="Jenis Ciptaan" value={data?.typeCreation || "-"} name="fullname" type="text" placeholder="" readOnly />
        <Field label="Sub-Jenis Ciptaan" value={String(data?.subTypeCreation || "-")} name="fullname" type="text" placeholder="" readOnly />
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <Field label="Negara Pertama Kali Diumumkan" value={String(data?.countryFirstAnnounced || "-")} name="fullname" type="text" placeholder="" readOnly />
        <Field label="Kota Pertama Kali Diumumkan" value={String(data?.cityFirstAnnounced || "-")} name="fullname" type="text" placeholder="" readOnly />
      </div>

      <Field label="Waktu Pertama Kali Diumumkan" value={String(data?.timeFirstAnnounced || "-")} name="fullname" type="text" placeholder="" readOnly />
      <FieldTextarea label="Uraian Singkat" value={data?.briefDescriptionCreation || "-"} name="question" placeholder="" required row={4} readOnly />
      <DetailDocument label="Surat Pernyataan" value={data?.statementLetter || ""} name="fullname" type="text" placeholder="" readOnly />
      <DetailDocument label="Surat Pengalihan Hak Cipta" value={data?.letterTransferCopyright || ""} name="fullname" type="text" placeholder="" readOnly />
      <DetailDocument label="Contoh Ciptaan" value={data?.exampleCreation || ""} name="fullname" type="text" placeholder="" readOnly />
    </div>
  );
};

export default DocumentSubmissionCopyright;
