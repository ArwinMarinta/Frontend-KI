import { Link } from "react-router-dom";
import HeaderNavigation from "../../../components/adminNavigation/headerNavigation";
import SideSubmisson from "../../../components/adminNavigation/sideSubmisson";
import useProfile from "../../../hooks/useProfile";
import Profile from "../../../assets/images/profile.webp";
import Button from "../submissionHistory/components/button";
import FormDetailProfile from "../../admins/profile/components/formDetailProfile";
import FormEditProfile from "../../admins/profile/components/formEditProfile";
import FormChagePassword from "../../admins/profile/components/formChangePassword";
import ModalLoading from "../../../components/modal/modalLoading";

const UserProfile = () => {
  const { user, currentStatus, handleStatusChange, profileStatus, form, handleChange, handleSubmit, errors, isFormChanged, loading } = useProfile();

  return (
    <>
      <div className="flex flex-row w-full h-full bg-[#F6F9FF]">
        <div className="min-h-full lg:w-[16%] hidden lg:block bg-white ">
          <SideSubmisson />
        </div>
        <div className="lg:w-[84%] w-full border ">
          <HeaderNavigation />
          <div className="px-4 lg:px-12   w-full flex lg:flex-row flex-col gap-10 py-8">
            <div className="bg-white p-6 rounded-md lg:w-[40%] w-full self-start shadow-md border border-gray-50">
              <Link to="/" className="flex w-full flex-col items-center p-4 gap-4 ">
                <img src={Profile} alt="image" className="h-28 w-28 object-cover rounded-full" />
                <div className="font-bold text-PRIMARY01 text-2xl block text-center w-full">{user?.fullname ?? "-"}</div>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-md w-full shadow-md border border-gray-50">
              <div className="flex flex-row w-full mb-10">
                <Button label="Profile" isActive={currentStatus === "Profile"} onClick={() => handleStatusChange("Profile")} />
                <Button label="Ubah Password" isActive={currentStatus === "Ubah Password"} onClick={() => handleStatusChange("Ubah Password")} />
              </div>

              {currentStatus === "Profile" && profileStatus === "Detail" && <FormDetailProfile handleStatusChange={handleStatusChange} user={user} />}
              {currentStatus === "Profile" && profileStatus === "Edit" && <FormEditProfile handleStatusChange={handleStatusChange} user={user} form={form} handleChange={handleChange} handleSubmit={handleSubmit} errors={errors} isFormChanged={isFormChanged} />}
              {currentStatus === "Ubah Password" && <FormChagePassword />}
            </div>
          </div>
        </div>
        <ModalLoading show={loading} />
      </div>
    </>
  );
};

export default UserProfile;
