import Navbar from "../../../../components/navigations/navbar";
import CsImage from "../../../../assets/images/Email.webp";
import useContactUs from "../hooks/useContactUs";
import Field from "../../../../components/input/fieldInput";
import FieldFile from "../../../../components/input/fieldFile";
import FieldTextarea from "../../../../components/input/fieldTextArea";
import ModalLoading from "../../../../components/modal/modalLoading";

const Contact = () => {
  const { form, errors, handleOnChange, handleSubmit, loading, message } = useContactUs();
  return (
    <>
      <Navbar />
      <main className="flex justify-center w-full">
        <div className="container flex flex-col pt-32 pb-20">
          <section id="section-1" className="flex lg:flex-row flex-col w-full h-full justify-center items-center gap-6">
            <div className=" flex justify-end w-full">
              <img src={CsImage} alt="..." loading="lazy" />
            </div>
            <form onSubmit={handleSubmit} className="w-full shadow-md flex flex-col  border h-full lg:px-12 px-8 gap-4 py-10 rounded-md">
              <h1 className="text-[40px] font-bold mb-5 lg:mb-0 ">Butuh Bantuan Kami?</h1>
              <p className="mb-4">Jika anda mengalami kesulitan atau ada pertanyaan jangan ragu untuk menghubungi admin kami. </p>
              {message === "Help Center berhasil ditambahkan" && <div className="bg-green-300 font-medium py-3 px-4 rounded-md text-green-900">Pesan berhasil dikirim ke admin</div>}
              <Field label="Email" value={form.email} name="email" type="email" placeholder="" onChange={handleOnChange} error={errors.email} need />
              <Field
                label="Nomor Telphone"
                value={form.phoneNumber}
                name="phoneNumber"
                type="text"
                placeholder=""
                onChange={(e) => {
                  const val = e.target.value;
                  // Hanya izinkan angka dan panjang maksimal 15 digit
                  if (/^\d{0,15}$/.test(val)) {
                    handleOnChange(e);
                  }
                }}
                error={errors.phoneNumber}
                need
              />
              <Field label="Masalah" value={form.problem} name="problem" type="text" placeholder="" onChange={handleOnChange} error={errors.problem} need />
              <FieldTextarea label="Pesan" value={form.message} name="message" placeholder="" row={2} onChange={handleOnChange} error={errors.message} need />
              <FieldFile label="Dokumen" value={form.document} name="document" onChange={handleOnChange} error={errors.document} />

              <div className="w-full flex justify-end mt-10">
                <button disabled={loading} type="submit" className="px-6 py-2 bg-PRIMARY01 rounded-md text-white font-semibold">
                  Kirim
                </button>
              </div>
            </form>
          </section>
        </div>
        <ModalLoading show={loading} />
      </main>
    </>
  );
};

export default Contact;
