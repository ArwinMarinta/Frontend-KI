import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import TimelineHistory from "../../../users/submissionHistory/components/progress/timelineHistory";
import useProgresSubmission from "../hooks/useProgresSubmission";

const ProgresSubmission = () => {
  const { progresSubmission } = useProgresSubmission();
  return (
    <main className="flex flex-row w-full h-full bg-GREY01">
      <div className="min-h-full w-[16%] bg-white">
        <SideNavigation />
      </div>
      <div className="w-[84%]  border ">
        <HeaderNavigation />
        <div className="container  mt-10 ">
          <div className="bg-white p-6 rounded-md">
            <div className="bg-white  ">
              <div className="mb-16">
                <h1 className="text-center text-3xl w-full font-bold">Progress Pengajuan Hak Paten</h1>
              </div>
              <div>
                <TimelineHistory data={progresSubmission} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProgresSubmission;
