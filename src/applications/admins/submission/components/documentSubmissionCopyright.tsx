import { SubmissionCopyrightType } from "../../../../types/submissionType";
import Field from "../../../../components/input/fieldInput";
import DetailDocument from "../../../../components/input/detailDocument";
import FieldTextarea from "../../../../components/input/fieldTextArea";
import { BsFillFilePdfFill } from "react-icons/bs";

interface DocumentType {
  data: SubmissionCopyrightType | null | undefined;
}

const DocumentSubmissionCopyright = ({ data }: DocumentType) => {
  const value = data?.exampleCreation || "";
  const isFilePath = /\.(pdf|docx?|jpg|jpeg|png|mp4)$/i.test(value); // deteksi dari ekstensi
  const isUrl = /^(https?:\/\/|www\.)/.test(value); // deteksi dari format URL
  return (
    <div className="flex flex-col gap-6">
      <Field label="Judul Ciptaan" value={data?.titleInvention || "-"} name="fullname" type="text" placeholder="" readOnly />
      <div className="flex flex-col lg:flex-row gap-6">
        <Field label="Jenis Ciptaan" value={data?.typeCreation?.title || "-"} name="fullname" type="text" placeholder="" readOnly />
        <Field label="Sub-Jenis Ciptaan" value={data?.subTypeCreation?.title || "-"} name="fullname" type="text" placeholder="" readOnly />
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <Field label="Negara Pertama Kali Diumumkan" value={String(data?.countryFirstAnnounced || "-")} name="fullname" type="text" placeholder="" readOnly />
        <Field label="Kota Pertama Kali Diumumkan" value={String(data?.cityFirstAnnounced || "-")} name="fullname" type="text" placeholder="" readOnly />
      </div>
      <Field label="Waktu Pertama Kali Diumumkan" value={String(data?.timeFirstAnnounced || "-")} name="fullname" type="text" placeholder="" readOnly />
      <FieldTextarea label="Uraian Singkat" value={data?.briefDescriptionCreation || "-"} name="question" placeholder="" required row={4} readOnly />
      <DetailDocument label="Surat Pernyataan" value={data?.statementLetter || ""} name="fullname" placeholder="" readOnly />
      <DetailDocument label="Surat Pengalihan Hak Cipta" value={data?.letterTransferCopyright || ""} name="fullname" placeholder="" readOnly />
      {isUrl && (
        <a href={value} target="_blank" rel="noopener noreferrer" className="block w-full">
          <div className="bg-gray-50 border text-base rounded-md p-2">
            <div className="flex flex-row items-center gap-2">
              <span className="text-PRIMARY01 font-semibold hover:underline">{value}</span>
            </div>
          </div>
        </a>
      )}

      {isFilePath && !isUrl && <DetailDocument label="Contoh Ciptaan" value={value.split("/").pop() || value} name="fullname" placeholder="" readOnly />}

      {data?.exampleCreation === null && (
        <>
          <div>
            <label className="block mb-2 text-base font-medium">Contoh Ciptaan</label>
            <div className="bg-gray-100 border text-base rounded-md p-2 text-gray-400 cursor-not-allowed">
              <div className="flex flex-row items-center gap-2">
                <BsFillFilePdfFill className="text-gray-400" />
                <span className="font-semibold">Tidak tersedia</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DocumentSubmissionCopyright;
