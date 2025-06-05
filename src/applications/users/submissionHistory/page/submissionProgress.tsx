import TimelineHistory from ".././components/progress/timelineHistory";
import useProgresSubmission from "../../../../hooks/useProgresSubmission";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import SideSubmisson from "../../../../components/adminNavigation/sideSubmisson";
import Breadcrumb from "../../../../components/breadcrumb.tsx/breadcrumb";

const SubmissionProgress = () => {
  const { progresSubmission, submissionType, toSlug } = useProgresSubmission();
  return (
    <>
      <div className="flex flex-row w-full h-full bg-[#F6F9FF]">
        <div className="min-h-full  lg:w-[16%] hidden lg:block bg-white">
          <SideSubmisson />
        </div>
        <div className="lg:w-[84%] w-full border">
          <HeaderNavigation />
          <div className="px-4 lg:px-12  py-8 ">
            <div className="mb-8">
              <Breadcrumb
                title="PROGRES PENGAJUAN"
                items={[
                  { label: "Progres Pengajuan", url: `/histori-pengajuan/${toSlug(submissionType)}` },
                  { label: submissionType, url: "" },
                ]}
              />
            </div>
            <div className="bg-white lg:p-16 p-4">
              <div className="flex items-center h-24 mb-10">
                <h1 className="text-center text-3xl w-full font-bold">Progress Pengajuan {submissionType}</h1>
              </div>
              <div>
                <TimelineHistory data={progresSubmission} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmissionProgress;
