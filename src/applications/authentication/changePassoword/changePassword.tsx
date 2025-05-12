import React from "react";
import Navbar from "../../../components/navigations/navbar";
import SideProfile from "../../users/profile/components/sideProfile";
import FormChagePassword from "../../admins/profile/components/formChangePassword";

const changePassword = () => {
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
              <h1 className="text-3xl font-bold mb-14">Histori Pengajuan</h1>
              <div className="mt-8">
                <FormChagePassword />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default changePassword;
