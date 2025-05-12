import Navbar from "../../../../components/navigations/navbar";
import FormComplatePatent from "../components/complete/formComplatePatent";
import useComplate from "../hooks/useComplate";
import useComplatePaten from "../hooks/useComplatePaten";

const SubmissionComplete = () => {
  const { type, submissionType } = useComplate();
  const { formComplatePaten, formComplatePatenError, handleChangeComplatePaten } = useComplatePaten();
  return (
    <>
      <Navbar />
      <main className="flex w-full h-full justify-center">
        <div className="container flex flex-col py-32 h-full gap-8 ">{type === "Lengkapi Berkas" && submissionType === "Paten" && <FormComplatePatent formComplatePaten={formComplatePaten} formComplatePatenError={formComplatePatenError} handleChangeComplatePaten={handleChangeComplatePaten} />}</div>
        <div>{/* <Complete /> */}</div>
      </main>
    </>
  );
};

export default SubmissionComplete;
