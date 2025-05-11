import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import useDetailSubmussion from "../hooks/useDetailSubmussion";
import Button from "../../../users/submissionHistory/components/button";
import GeneralInformation from "../components/generalInformation";
import PersonalDataSubmission from "../components/personalDataSubmission";
import DocumentSubmissionPatent from "../components/documentSubmissionPatent";
import DocumentSubmissionCopyright from "../components/documentSubmissionCopyright";
import DocumentSubmissionIndutrialDesign from "../components/documentSubmissionIndutrialDesign";

const DetailSubmission = () => {
  const { detailSubmission, current, handleChange } = useDetailSubmussion();
  return (
    <main className="flex flex-row w-full h-full bg-GREY01">
      <div className="min-h-full w-[16%] bg-white">
        <SideNavigation />
      </div>
      <div className="w-[84%]  border ">
        <HeaderNavigation />
        <div className="container  py-10 ">
          <div className="bg-white p-6 rounded-md">
            <div className="bg-white  ">
              <div className="mb-16">
                <h1 className="text-center text-3xl w-full font-bold">Informasi Pengajuan</h1>
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
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailSubmission;
