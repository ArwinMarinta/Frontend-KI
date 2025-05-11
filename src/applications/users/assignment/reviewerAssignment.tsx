import Navbar from "../../../components/navigations/navbar";
import SideProfile from "../profile/components/sideProfile";
import Assignment from "./components/assignment";

const ReviewerAssignment = () => {
  return (
    <>
      <Navbar />
      <main className="flex w-full h-full justify-center">
        <div className="container flex flex-row py-32 h-full gap-8">
          <div className="min-h-full w-[20%]">
            <SideProfile />
          </div>
          <div className="min-h-full w-[80%]">
            <Assignment />
          </div>
        </div>
      </main>
    </>
  );
};

export default ReviewerAssignment;
