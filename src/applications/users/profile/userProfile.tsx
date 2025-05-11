import Navbar from "../../../components/navigations/navbar";
import SideProfile from "./components/sideProfile";
import FormProfile from "./components/formProfile";

const UserProfile = () => {
  return (
    <>
      <Navbar />
      <main className="flex w-full h-full justify-center">
        <div className="container flex flex-row py-32 h-full gap-8">
          <div className="min-h-full w-[20%]">
            <SideProfile />
          </div>
          <div className="min-h-full w-[80%]">
            <FormProfile />
          </div>
        </div>
      </main>
    </>
  );
};

export default UserProfile;
