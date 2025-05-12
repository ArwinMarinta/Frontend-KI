import Navbar from "../../../../components/navigations/navbar";
import BackButton from "../../../../components/button/backButton";
import useDetailSubmussion from "../../../../hooks/useDetailSubmussion";
import Button from "../components/button";
import GeneralInformation from "../../../admins/submission/components/generalInformation";
import PersonalDataSubmission from "../../../admins/submission/components/personalDataSubmission";
import DocumentSubmissionPatent from "../../../admins/submission/components/documentSubmissionPatent";
import DocumentSubmissionCopyright from "../../../admins/submission/components/documentSubmissionCopyright";
import DocumentSubmissionIndutrialDesign from "../../../admins/submission/components/documentSubmissionIndutrialDesign";
import DocumentSubmissionBrand from "../../../admins/submission/components/documentSubmissionBrand";

const SubmissionDetail = () => {
  const { detailSubmission, current, handleChange } = useDetailSubmussion();
  return (
    <>
      <Navbar />
      <main className="flex w-full h-full justify-center">
        <div className="container flex flex-col py-32 h-full gap-8 ">
          <div className="grid grid-cols-3 items-center h-24">
            <div>
              <BackButton url={"/histori-pengajuan"} />
            </div>
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
      </main>
    </>
  );
};

export default SubmissionDetail;
