import Navbar from "../../../../components/navigations/navbar";
import BackButton from "../../../../components/button/backButton";
import TimelineHistory from ".././components/progress/timelineHistory";
import useProgresSubmission from "../../../../hooks/useProgresSubmission";

const SubmissionProgress = () => {
  const { progresSubmission } = useProgresSubmission();
  return (
    <>
      <Navbar />
      <main className="flex w-full h-full justify-center">
        <div className="container flex flex-col py-32 h-full gap-8 ">
          <div className="grid grid-cols-3 items-center h-24">
            <div>
              <BackButton url={"/histori-pengajuan"} />
            </div>
            <h1 className="text-center text-3xl w-full font-bold">Progress Pengajuan Hak Paten</h1>
          </div>
          <div>
            <TimelineHistory data={progresSubmission} />
          </div>
        </div>
      </main>
    </>
  );
};

export default SubmissionProgress;
