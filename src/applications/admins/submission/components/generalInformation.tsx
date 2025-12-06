import Field from "../../../../components/input/fieldInput";
import { formatDateRangeWithYear, formatIndonesianDate } from "../../../../utils/formatDate";
import { TermType } from "../../../../types/termsType";
import { Review } from "../../../../types/submissionType";
import DetailDocument from "../../../../components/input/detailDocument";

interface GeneralType {
  data: Review | null;
  terms: TermType[] | null;
  status?: string;
}

const GeneralInformation = ({ data, terms, status }: GeneralType) => {
  const selectedIds = new Set(data?.submission?.termsConditions?.map((term) => term.id));
  return (
    <div className="flex flex-col gap-6">
      <Field label="Jenis Pengajuan" value={data?.submission?.submissionType?.title || "-"} name="fullname" type="text" placeholder="" readOnly />
      <Field label="Status Terakhir" value={String(data?.centralStatus ?? "-")} name="fullname" type="text" placeholder="" readOnly />
      <Field label="Progres Terakhir" value={data?.progress[0].status || "-"} name="fullname" type="text" placeholder="" readOnly />

      <div className="flex lg:flex-row flex-col w-full gap-6">
        <Field label="Awal Pengajuan" value={formatIndonesianDate(data?.createdAt) || "-"} name="fullname" type="text" placeholder="" readOnly />
        <Field label="Selesai Pengajuan" value={data?.progress?.[0]?.status === "Sertifikat Terbit" ? formatIndonesianDate(data.progress[0].createdAt) : "-"} name="fullname" type="text" placeholder="" readOnly />
      </div>

      {status === "Detail" && (
        <>
          <div className="flex lg:flex-row flex-col w-full gap-6">
            <Field label="Skema Pendanaan" value={data?.submission?.submissionScheme || "Belum memilih skema pendanaan"} name="fullname" type="text" placeholder="" readOnly />
            {data?.submission?.submissionScheme === "Pendanaan" && <Field label="Periode Pengajuan" value={`${data.submission.group?.group} (${formatDateRangeWithYear(data.submission.group?.startDate, data.submission.group?.endDate)})`} name="fullname" type="text" placeholder="" readOnly />}
          </div>
          {data?.submission?.submissionScheme === "Mandiri" && <Field label="Kode Pembayaran" value={data?.submission?.payment?.billingCode || ""} name="fullname" type="text" placeholder="" readOnly />}

          {data?.submission?.submissionScheme === "Mandiri" && <DetailDocument label="Bukti Pembayaran" value={data?.submission?.payment?.proofPayment || ""} name="fullname" type="text" placeholder="" readOnly />}

          {data?.submission?.submissionScheme === "Pendanaan" && (
            <div className="flex flex-col gap-2">
              <label className="block text-base font-medium">Prasyarat Penerima Pendanaan</label>
              {terms?.map((term) => (
                <div key={term.id} className="flex items-center gap-2">
                  <input type="checkbox" checked={selectedIds.has(term.id)} className="w-4 h-4 text-PRIMARY01 bg-gray-100 border-gray-300 rounded-md focus:ring-PRIMARY010 dark:focus:ring-PRIMARY01 dark:ring-offset-gray-800 focus:ring-1" readOnly />
                  <label>{term.terms}</label>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GeneralInformation;
