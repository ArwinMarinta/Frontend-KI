import SideNavigation from "../../../../components/adminNavigation/sideNavigation";
import HeaderNavigation from "../../../../components/adminNavigation/headerNavigation";
import { Link } from "react-router-dom";
import Profile from "../../../../assets/images/profile.webp";
import useProfile from "../../../../hooks/useProfile";

import Button from "../../../users/submissionHistory/components/button";
import FormDetailProfile from "../components/formDetailProfile";
import FormEditProfile from "../components/formEditProfile";
import FormChagePassword from "../../profile/components/formChangePassword";

const ProfileAdmin = () => {
  const { user, currentStatus, handleStatusChange, profileStatus, form, handleChange, handleSubmit, errors } = useProfile();
  return (
    <main className="flex flex-row w-full h-full bg-GREY01">
      <div className="min-h-full w-[16%] bg-white">
        <SideNavigation />
      </div>

      <div className="w-[84%]  border ">
        <HeaderNavigation />
        <div className="px-6 mt-16 w-full flex flex-row gap-10">
          <div className="bg-white p-6 rounded-md w-[40%] self-start">
            <Link to="/" className="flex w-full flex-col items-center p-4 gap-4">
              <img src={Profile} alt="image" className="h-28 w-28 object-cover rounded-full" />
              <span className="font-bold text-PRIMARY01 text-2xl">{user?.fullname ?? "-"}</span>
            </Link>
          </div>
          <div className="bg-white p-6 rounded-md w-full">
            <div className="flex flex-row w-full mb-10">
              <Button label="Profile" isActive={currentStatus === "Profile"} onClick={() => handleStatusChange("Profile")} />
              <Button label="Ubah Password" isActive={currentStatus === "Ubah Password"} onClick={() => handleStatusChange("Ubah Password")} />
            </div>

            {currentStatus === "Profile" && profileStatus === "Detail" && <FormDetailProfile handleStatusChange={handleStatusChange} user={user} />}
            {currentStatus === "Profile" && profileStatus === "Edit" && <FormEditProfile handleStatusChange={handleStatusChange} user={user} form={form} handleChange={handleChange} handleSubmit={handleSubmit} errors={errors} />}
            {currentStatus === "Ubah Password" && <FormChagePassword />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileAdmin;
