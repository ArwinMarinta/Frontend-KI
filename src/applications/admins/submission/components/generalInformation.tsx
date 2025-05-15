import { DetailSubmissionType } from "../../../../types/submissionType";
import Field from "../../../../components/input/fieldInput";
import { formatIndonesianDate } from "../../../../utils/formatDate";
import { TermType } from "../../../../types/termsType";

interface GeneralType {
  data: DetailSubmissionType | null;
  terms: TermType[] | null;
}

const GeneralInformation = ({ data, terms }: GeneralType) => {
  const selectedIds = new Set(data?.submission.termsConditions?.map((term) => term.id));
  return (
    <div className="flex flex-col gap-4">
      <Field label="Jenis Pengajuan" value={data?.submission.submissionType?.title || "-"} name="fullname" type="text" placeholder="" readOnly />
      <div className="flex flex-row gap-6">
        <Field label="Awal Pengajuan" value={formatIndonesianDate(data?.createdAt) || "-"} name="fullname" type="text" placeholder="" readOnly />
        <Field label="Selesai Pengajuan" value={formatIndonesianDate(data?.updatedAt) || "-"} name="fullname" type="text" placeholder="" readOnly />
      </div>
      <div className="flex flex-row gap-6">
        <Field label="Skema Pendanaan" value={data?.submission.submissionScheme || "-"} name="fullname" type="text" placeholder="" readOnly />
        <Field label="Periode Pengajuan" value={data?.submission.submissionScheme || "-"} name="fullname" type="text" placeholder="" readOnly />
      </div>

      <div className="flex flex-col gap-2">
        <label className="block text-base font-medium">Prasyarat Penerima Pendanaan</label>
        {data?.submission.submissionScheme && data.submission.submissionScheme === "pendanaan" && (
          <>
            <label className="block text-base font-medium">Prasyarat Penerima Pendanaan</label>
            {terms?.map((term) => (
              <div key={term.id} className="flex items-center gap-2">
                <input type="checkbox" checked={selectedIds.has(term.id)} className="w-4 h-4 text-PRIMARY01 bg-gray-100 border-gray-300 rounded-md focus:ring-PRIMARY010 dark:focus:ring-PRIMARY01 dark:ring-offset-gray-800 focus:ring-1" readOnly />
                <label>{term.terms}</label>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default GeneralInformation;
