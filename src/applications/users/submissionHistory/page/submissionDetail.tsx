import useDetailSubmussion from "../../../../hooks/useDetailSubmussion";
import Button from "../components/button";
import GeneralInformation from "../../../admins/submission/components/generalInformation";
import PersonalDataSubmission from "../../../admins/submission/components/personalDataSubmission";
import DocumentSubmissionPatent from "../../../admins/submission/components/documentSubmissionPatent";
import DocumentSubmissionCopyright from "../../../admins/submission/components/documentSubmissionCopyright";
import DocumentSubmissionIndutrialDesign from "../../../admins/submission/components/documentSubmissionIndutrialDesign";
import DocumentSubmissionBrand from "../../../admins/submission/components/documentSubmissionBrand";
import SideSubmisson from "../../../../components/adminNavigation/sideSubmisson";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import Breadcrumb from "../../../../components/breadcrumb.tsx/breadcrumb";

const SubmissionDetail = () => {
  const { detailSubmission, current, handleChange, submissionType, toSlug, terms } = useDetailSubmussion();
  return (
    <>
      <div className="flex flex-row w-full h-full bg-[#F6F9FF]">
        <div className="min-h-full lg:w-[16%] hidden lg:block bg-white">
          <SideSubmisson />
        </div>
        <div className="lg:w-[84%] w-full border ">
          <HeaderNavigation />
          <div className="px-4 lg:px-12  py-8 ">
            <div className="mb-8">
              <Breadcrumb
                title="PROGRES PENGAJUAN"
                items={[
                  { label: "Progres Pengajuan", url: `/histori-pengajuan/${toSlug(submissionType)}` },
                  { label: "Detail Pengajuan", url: "" },
                ]}
              />
            </div>
            <div className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
              <div className="flex  items-center h-24 mb-10">
                <h1 className="text-center text-3xl w-full font-bold">Riwayat Pengajuan</h1>
              </div>
              <div className="flex flex-row w-full justify-center mb-10">
                <Button label="Informasi Umum" isActive={current === "Informasi Umum"} onClick={() => handleChange("Informasi Umum")} />
                <Button label="Data Diri" isActive={current === "Data Diri"} onClick={() => handleChange("Data Diri")} />
                <Button label="Dokumen Pengajuan" isActive={current === "Dokumen Pengajuan"} onClick={() => handleChange("Dokumen Pengajuan")} />
              </div>
              <div>
                {current === "Informasi Umum" && <GeneralInformation terms={terms} data={detailSubmission} />}
                {current === "Data Diri" && <PersonalDataSubmission data={detailSubmission?.submission?.personalDatas} />}
                {current === "Dokumen Pengajuan" && (
                  <>
                    {detailSubmission?.submission?.patent && <DocumentSubmissionPatent data={detailSubmission.submission.patent} />}
                    {detailSubmission?.submission?.copyright && <DocumentSubmissionCopyright data={detailSubmission.submission.copyright} />}
                    {detailSubmission?.submission?.industrialDesign && <DocumentSubmissionIndutrialDesign data={detailSubmission.submission.industrialDesign} />}
                    {detailSubmission?.submission?.brand && <DocumentSubmissionBrand data={detailSubmission.submission.brand} />}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Navbar /> */}
      {/* <main className="flex w-full h-full justify-center">
        <div className="container flex flex-col py-32 h-full gap-8 ">
          <div className="grid grid-cols-3 items-center h-24">
            <div>{status === "Riwayat" ? <BackButton url={`/histori-pengajuan/${toSlug(submissionType)}`} /> : <BackButton url={`/penugasan`} />}</div>
            <h1 className="text-center text-3xl w-full font-bold">Riwayat Pengajuan</h1>
          </div>
          <div className="flex flex-row w-full justify-center mb-10">
            <Button label="Informasi Umum" isActive={current === "Informasi Umum"} onClick={() => handleChange("Informasi Umum")} />
            <Button label="Data Diri" isActive={current === "Data Diri"} onClick={() => handleChange("Data Diri")} />
            <Button label="Dokumen Pengajuan" isActive={current === "Dokumen Pengajuan"} onClick={() => handleChange("Dokumen Pengajuan")} />
          </div>
          <div>
            {current === "Informasi Umum" && <GeneralInformation data={detailSubmission} />}
            {current === "Data Diri" && <PersonalDataSubmission data={detailSubmission?.submission.personalDatas} />}
            {current === "Dokumen Pengajuan" && (
              <>
                {detailSubmission?.submission.patent && <DocumentSubmissionPatent data={detailSubmission.submission.patent} />}
                {detailSubmission?.submission.copyright && <DocumentSubmissionCopyright data={detailSubmission.submission.copyright} />}
                {detailSubmission?.submission.industrialDesign && <DocumentSubmissionIndutrialDesign data={detailSubmission.submission.industrialDesign} />}
                {detailSubmission?.submission.brand && <DocumentSubmissionBrand data={detailSubmission.submission.brand} />}
              </>
            )}
          </div>
        </div>
      </main> */}
    </>
  );
};

export default SubmissionDetail;
