import BackButton from "../../../../components/button/backButton";
import TimelineHistory from ".././components/progress/timelineHistory";
import useProgresSubmission from "../../../../hooks/useProgresSubmission";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import SideSubmisson from "../../../../components/adminNavigation/sideSubmisson";

const SubmissionProgress = () => {
  const { progresSubmission, submissionType, toSlug } = useProgresSubmission();
  return (
    <>
      <div className="flex flex-row w-full h-full bg-gray-100">
        <div className="min-h-full w-[16%] bg-white">
          <SideSubmisson />
        </div>
        <div className="w-[84%]  border  ">
          <HeaderNavigation />
          <div className="container  mt-16  ">
            <div className="bg-white p-8">
              <div className="grid grid-cols-3 items-center h-24 mb-10">
                <div>
                  <BackButton url={`/histori-pengajuan/${toSlug(submissionType)}`} />
                </div>
                <h1 className="text-center text-3xl w-full font-bold">Progress Pengajuan Hak Paten</h1>
              </div>
              <div>
                <TimelineHistory data={progresSubmission} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Navbar /> */}
      {/* <main className="flex w-full h-full justify-center">
        <div className="container flex flex-col py-32 h-full gap-8 ">
          <div className="grid grid-cols-3 items-center h-24">
            <div>
              <BackButton url={`/histori-pengajuan/${toSlug(submissionType)}`} />
            </div>
            <h1 className="text-center text-3xl w-full font-bold">Progress Pengajuan Hak Paten</h1>
          </div>
          <div>
            <TimelineHistory data={progresSubmission} />
          </div>
        </div>
      </main> */}
    </>
  );
};

export default SubmissionProgress;
