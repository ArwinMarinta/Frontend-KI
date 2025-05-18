import BackButton from "../../../../../components/button/backButton";
import Field from "../../../../../components/input/fieldInput";
import FieldTextarea from "../../../../../components/input/fieldTextArea";
import { API_FILE } from "../../../../../config/config";
import { SubmissionProgress } from "../../../../../types/submissionType";
import { formatIndonesianDateTime } from "../../../../../utils/formatDate";
import { BsFillFilePdfFill } from "react-icons/bs";

interface FormRevisionProps {
  progresSubmission: SubmissionProgress[] | null;
}
const FormRevision = ({ progresSubmission }: FormRevisionProps) => {
  return (
    <>
      <div className="grid grid-cols-3 items-center h-24">
        <div>
          <BackButton url={"/histori-pengajuan"} />
        </div>
        <h1 className="text-center text-3xl w-full font-bold">Revisi Berkas Pengajuan</h1>
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <label className="block mb-2 text-base font-medium">Status Pengajuan</label>
          <div className="text-base text-[#842029] font-semibold rounded-md block w-full p-2 bg-[#F5C2C7] border">{progresSubmission?.[0].status}</div>
        </div>
        <Field label="Tanggal" value={formatIndonesianDateTime(progresSubmission?.[0]?.updatedAt ?? "")} name="twitter" type="text" placeholder="" readOnly />

        <div>
          <label className="block mb-2 text-base font-medium">File Revisi</label>
          <div className="flex flex-col gap-2">
            {(progresSubmission?.[0]?.revisionFile || []).length > 0 ? (
              (progresSubmission?.[0]?.revisionFile || []).map((data) => (
                <a key={data.id} href={`${API_FILE}/documents/${data.file}`} download={data.fileName} target="_blank" rel="noopener noreferrer" className="text-base font-semibold rounded-md w-full p-2 bg-gray-50 border flex flex-row gap-2 items-center hover:bg-gray-100 text-PRIMARY01 underline">
                  <BsFillFilePdfFill className="text-RED01" />
                  <div>{data.fileName}</div>
                </a>
              ))
            ) : (
              <div className="text-gray-400 italic text-sm py-2 px-4 border border-BORDER01 rounded-md">Tidak ada file revisi</div>
            )}
          </div>
        </div>
        <FieldTextarea label="Komentar" value={progresSubmission?.[0]?.comment ?? ""} name="address" placeholder="" required row={4} readOnly />
      </div>
    </>
  );
};

export default FormRevision;
