import React from "react";
import Navbar from "../../../components/navigations/navbar";
import SideProfile from "../../users/profile/components/sideProfile";
import FormChagePassword from "./components/formChagePassword";

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
            <FormChagePassword />
          </div>
        </div>
      </main>
    </>
  );
};

export default changePassword;
