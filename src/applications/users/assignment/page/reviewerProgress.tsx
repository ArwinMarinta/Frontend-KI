import { Link } from "react-router-dom";
import BackButton from "../../../../components/button/backButton";
import Navbar from "../../../../components/navigations/navbar";
import useProgresSubmission from "../../../../hooks/useProgresSubmission";
import TimelineHistory from "../../submissionHistory/components/progress/timelineHistory";

const ReviewerProgress = () => {
  const { progresSubmission, id } = useProgresSubmission();

  return (
    <>
      <Navbar />
      <main className="flex w-full h-full justify-center">
        <div className="container flex flex-col py-32 h-full gap-8 ">
          <div className="grid grid-cols-3 items-center h-24">
            <div>
              <BackButton url={"/penugasan"} />
            </div>
            <h1 className="text-center text-3xl w-full font-bold">Progress Pengajuan Hak Paten</h1>
          </div>
          <div>
            <TimelineHistory data={progresSubmission} />
          </div>
          <div className="flex justify-end">
            <Link to={`/penugasan/progress/ubah/${id}`}>
              <button className="bg-PRIMARY01 px-4 py-2 text-white font-medium rounded-md cursor-pointer">Ubah Progress</button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default ReviewerProgress;
