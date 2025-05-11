import BackButton from "../../../../components/button/backButton";
import Navbar from "../../../../components/navigations/navbar";
import Complete from ".././components/complete/complete";

const SubmissionComplete = () => {
  return (
    <>
      <Navbar />
      <main className="flex w-full h-full justify-center">
        <div className="container flex flex-col py-32 h-full gap-8 ">
          <div className="grid grid-cols-3 items-center h-24">
            <div>
              <BackButton />
            </div>
            <h1 className="text-center text-3xl w-full font-bold">Lengkapi Berkas Paten</h1>
          </div>
          <div>
            <Complete />
          </div>
        </div>
      </main>
    </>
  );
};

export default SubmissionComplete;
