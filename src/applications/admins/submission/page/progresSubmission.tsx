import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import TimelineHistory from "../../../users/submissionHistory/components/progress/timelineHistory";
import useProgresSubmission from "../../../../hooks/useProgresSubmission";
import { Link, useParams } from "react-router-dom";
import Breadcrumb from "../../../../components/breadcrumb.tsx/breadcrumb";
import { formatLabel } from "../../../../utils/toSlug";

const ProgresSubmission = () => {
  const { name } = useParams<{ name: string }>();

  const { progresSubmission, submissionId } = useProgresSubmission();
  return (
    <main className="flex flex-row w-full h-full bg-[#F6F9FF]">
      <div className="min-h-full lg:w-[16%] hidden lg:block bg-white">
        <SideNavigation />
      </div>
      <div className="lg:w-[84%] w-full  border">
        <HeaderNavigation />
        <div className="px-4 lg:px-12  py-8  ">
          <div className="mb-8">
            <Breadcrumb
              title="INFORMASI PENGAJUAN"
              items={[
                { label: `${formatLabel(name)}`, url: `/permohonan/${name}` },
                { label: "Progress Pengajuan", url: "" },
              ]}
            />
          </div>
          <div className="lg:p-16 p-4 rounded-md bg-white shadow-md border border-gray-50">
            <div className="bg-white  ">
              <div className="mb-16">
                <h1 className="text-center text-3xl w-full font-bold">Progress Pengajuan Hak Paten</h1>
              </div>
              <div>
                <TimelineHistory data={progresSubmission} />
              </div>
              <div className="flex justify-end">
                <Link to={`/permohonan/${name}/progres/ubah`} state={{ submissionId: submissionId }}>
                  <button className="bg-PRIMARY01 px-4 py-2 text-white font-medium rounded-md cursor-pointer">Ubah Progress</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProgresSubmission;
