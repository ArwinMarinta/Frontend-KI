import React from "react";
import Navbar from "../../../components/navigations/navbar";
import BackButton from "../../../components/button/backButton";
import DetailSubmission from "./components/Detail/detail";

const SubmissionDetail = () => {
  return (
    <>
      <Navbar />
      <main className="flex w-full h-full justify-center">
        <div className="container flex flex-col py-32 h-full gap-8 ">
          <div className="grid grid-cols-3 items-center h-24">
            <div>
              <BackButton />
            </div>
            <h1 className="text-center text-3xl w-full font-bold">Riwayat Pengajuan</h1>
          </div>
          <div>
            <DetailSubmission />
          </div>
        </div>
      </main>
    </>
  );
};

export default SubmissionDetail;
