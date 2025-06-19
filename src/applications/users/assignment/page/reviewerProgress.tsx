import { Link } from "react-router-dom";
import useProgresSubmission from "../../../../hooks/useProgresSubmission";
import TimelineHistory from "../../submissionHistory/components/progress/timelineHistory";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import SideSubmisson from "../../../../components/adminNavigation/sideSubmisson";
import Breadcrumb from "../../../../components/breadcrumb.tsx/breadcrumb";

const ReviewerProgress = () => {
  const { progresSubmission, submissionId, submissionType } = useProgresSubmission();

  return (
    <>
      <div className="flex flex-row w-full h-full bg-[#F6F9FF]">
        <div className="min-h-full lg:w-[16%] hidden lg:block bg-white">
          <SideSubmisson />
        </div>
        <div className="lg:w-[84%] w-full  border ">
          <HeaderNavigation />
          <div className="px-4 lg:px-12  py-8 ">
            <div className="mb-8">
              <Breadcrumb
                title="PENUGASAN"
                items={[
                  { label: "Penugasan", url: "/penugasan" },
                  { label: "Progres", url: "" },
                  { label: submissionType, url: "" },
                ]}
              />
            </div>
            <div className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
              <div className="flex items-center h-24 mb-16">
                <h1 className="text-center text-3xl w-full font-bold">Progress Pengajuan {submissionType}</h1>
              </div>
              <div className="mb-16">
                <TimelineHistory data={progresSubmission} />
              </div>
              <div className="flex justify-end">
                <Link to={`/penugasan/progress/ubah`} state={{ submissionId: submissionId, name: submissionType }}>
                  <button className="bg-PRIMARY01 px-4 py-2 text-white font-medium rounded-md cursor-pointer">Ubah Progress</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewerProgress;
