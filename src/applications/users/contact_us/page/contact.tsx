import Navbar from "../../../../components/navigations/navbar";
import CsImage from "../../../../assets/images/Email.webp";
import useContactUs from "../hooks/useContactUs";
import Field from "../../../../components/input/fieldInput";
import FieldFile from "../../../../components/input/fieldFile";
import FieldTextarea from "../../../../components/input/fieldTextArea";
import LoadingAnimation from "../../../../assets/send-animation.webm";
import LoadingAnimation2 from "../../../../assets/send-animation2.gif";
const Contact = () => {
  const { form, errors, handleOnChange, handleSubmit } = useContactUs();
  return (
    <>
      <Navbar />
      <main className="flex justify-center w-full">
        <div className="container flex flex-col">
          <section id="section-1" className="flex py-32 flex-row w-full h-full justify-center items-center gap-6">
            <div className=" flex justify-end w-full">
              <img src={CsImage} alt="..." />
            </div>
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center border h-full px-12 gap-4 py-10 rounded-md">
              <h1 className="text-[40px] font-bold">Butuh Bantuan Kami?</h1>
              <Field label="Email" value={form.email} name="email" type="email" placeholder="" onChange={handleOnChange} error={errors.email} need />
              <Field label="Nomor Telphone" value={form.phoneNumber} name="phoneNumber" type="text" placeholder="" onChange={handleOnChange} error={errors.phoneNumber} need />
              <Field label="Masalah" value={form.problem} name="problem" type="text" placeholder="" onChange={handleOnChange} error={errors.problem} need />
              <FieldTextarea label="Pesan" value={form.message} name="message" placeholder="" row={2} onChange={handleOnChange} error={errors.message} need />
              <FieldFile label="Dokumen" value={form.document} name="document" onChange={handleOnChange} />

              <div className="w-full flex justify-end mt-10">
                <button type="submit" className="px-6 py-2 bg-PRIMARY01 rounded-md text-white font-semibold">
                  Kirim
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </>
  );
};

export default Contact;
