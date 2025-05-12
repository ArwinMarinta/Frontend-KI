import Navbar from "../../../components/navigations/navbar";
import useProfile from "../../../hooks/useProfile";
import FormDetailProfile from "../../admins/profile/components/formDetailProfile";
import FormEditProfile from "../../admins/profile/components/formEditProfile";
import SideProfile from "./components/sideProfile";

const UserProfile = () => {
  const { user, currentStatus, handleStatusChange, profileStatus, form, handleChange, handleSubmit, errors } = useProfile();

  return (
    <>
      <Navbar />
      <main className="flex w-full h-full justify-center">
        <div className="container flex flex-row py-32 h-full gap-8">
          <div className="min-h-full w-[20%]">
            <SideProfile />
          </div>
          <div className="min-h-full w-[80%]">
            <div className="flex flex-col p-8 border rounded-md shadow-md">
              <h1 className="text-3xl font-bold mb-14">Profile</h1>
              <form>
                {/* <img src={ProfileImage} alt="image" className="h-20 rounded-full" />
                <div className="mt-4">
                  <input className="block w-full mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 max-w-xs focus:outline-none" id="file_input" type="file"></input>
                  <span className="">Format file JPG, PNG, JPEG</span>
                </div> */}
                {currentStatus === "Profile" && profileStatus === "Detail" && <FormDetailProfile handleStatusChange={handleStatusChange} user={user} />}
                {currentStatus === "Profile" && profileStatus === "Edit" && <FormEditProfile handleStatusChange={handleStatusChange} user={user} form={form} handleChange={handleChange} handleSubmit={handleSubmit} errors={errors} />}
                {/* <div className="mt-8 flex justify-end">
                  <button className="py-2 px-4 bg-PRIMARY01 font-medium text-white rounded-md">Ubah</button>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default UserProfile;
