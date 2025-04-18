import Navbar from "../../../components/navigations/navbar";
import Stepper from "./components/stepper";
import { useState } from "react";
import Form_1 from "./components/form_1";
import Form_2 from "./components/form_2";
import Form_3 from "./components/form_3";
const Submission = () => {
  const [currentStep, setCurretStep] = useState(1);
  const [submissionType, setSubmissionType] = useState("HakCipta");

  return (
    <>
      <Navbar />
      <main className="w-full flex justify-center">
        <section className="container w-full flex flex-col py-32 gap-10 ">
          <div className="flex justify-center">
            <h1 className="text-[48px] font-bold mb-20">Formulir Pengajuan</h1>
          </div>
          <Stepper currentStep={currentStep} />

          <div>
            {currentStep === 1 && <Form_1 />}
            {currentStep === 2 && <Form_2 />}
            {currentStep === 3 && <Form_3 submissionType={submissionType} />}
          </div>
        </section>
      </main>
    </>
  );
};

export default Submission;
