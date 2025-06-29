import DetailDocument from "../../../../components/input/detailDocument";
import Field from "../../../../components/input/fieldInput";
import FieldTextarea from "../../../../components/input/fieldTextArea";
import { SubmissionBrand } from "../../../../types/submissionType";
import { getHrefByFileName } from "../../../../utils/detecdtedFile";
interface DocumentType {
  data?: SubmissionBrand | null | undefined;
}
const DocumentSubmissionBrand = ({ data }: DocumentType) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <Field label="Tipe Permohonan" value={data?.applicationType ?? "-"} name="fullname" type="text" placeholder="" readOnly />
        <Field label="Tipe Merek" value={data?.brandType?.title ?? ""} name="fullname" type="text" placeholder="" readOnly />
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <Field label="Nama Refrensi Label Merek" value={data?.referenceName ?? "-"} name="fullname" type="text" placeholder="" readOnly />
        <Field label="Unsur Warna Dalam Label Merek" value={data?.elementColor?.toString() ?? "-"} name="fullname" type="text" placeholder="" readOnly />
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <Field label="Terjemahan Jika Menggunakan Bahasa Asing" value={data?.translate ?? "-"} name="fullname" type="text" placeholder="" readOnly />
        <Field label="Pengucapan Jika Menggunakan Huruf Non-Latin" value={data?.pronunciation?.toString() ?? "-"} name="fullname" type="text" placeholder="" readOnly />
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <Field label="Disclaimer" value={data?.disclaimer ?? "-"} name="fullname" type="text" placeholder="" readOnly />
        <Field label="Jenis Dokumen" value={data?.documentType ?? "-"} name="fullname" type="text" placeholder="" readOnly />
      </div>
      <FieldTextarea label="Uraian Singkat" value={data?.description || "-"} name="question" placeholder="" required row={4} readOnly />
      <FieldTextarea label="Uraian Singkat" value={data?.information || "-"} name="question" placeholder="" required row={4} readOnly />
      <DetailDocument label="Label Merek" value={data?.labelBrand || ""} name="fullname" type="text" placeholder="" readOnly />
      {/* <DetailDocument label="Upload File" value={data?.fileUploade || ""} name="fullname" type="text" placeholder="" readOnly /> */}
      <DetailDocument label="Tanda Tangan Permohonan" value={data?.signature || ""} name="fullname" type="text" placeholder="" readOnly />
      <DetailDocument label="Surat Pernyataan" value={data?.fileUploade || ""} name="fullname" type="text" placeholder="" readOnly />
      {/* <DetailDocument label="Surat Pernyataan UMKM" value={data?.letterStatment || ""} name="fullname" type="text" placeholder="" readOnly /> */}

      <div className="font-bold text-2xl mt-4">Data Merek Tambahan</div>

      <div className="overflow-x-auto w-full mb-6">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border-b max-w-10">No</th>
              <th className="px-4 py-2 text-left border-b ">File</th>
              <th className="px-4 py-2 text-left border-b ">Deskripsi</th>
            </tr>
          </thead>
          <tbody>
            {(data?.additionalDatas?.length || 0) > 0 ? (
              data?.additionalDatas!.map((item, index) => (
                <tr key={index} className="bg-white hover:bg-gray-50 h-full">
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  <td className="px-4 py-2 border-b">
                    {item.file ? (
                      <a href={getHrefByFileName(item.file)} target="_blank" rel="noopener noreferrer" className="text-PRIMARY01 underline">
                        {item.fileName}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">{item.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-4 text-center text-gray-500 border-b">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentSubmissionBrand;
