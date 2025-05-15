import BackButton from "../../../../../components/button/backButton";

import Field from "../../../../../components/input/fieldInput";
import InputFile from "../field/InputFile";

const FormConfimPayment = () => {
  return (
    <>
      <div className="grid grid-cols-[auto_1fr_auto] items-center h-24">
        <div className="max-h-fit">
          <BackButton url={"/histori-pengajuan"} />
        </div>
        <h1 className="text-center text-3xl w-full font-bold">Konfirmasi Pembayaran Mandiri</h1>
        <div></div>
      </div>
      <div className="flex flex-col gap-6">
        <Field label="Kode Pembayaran Anda" value="9079643" name="titleInvention" type="text" placeholder="" readOnly />
        <InputFile label="Klaim" value="" name="claim" required need />
      </div>
      <div className="flex justify-end mt-6">
        <button className="bg-PRIMARY01 px-6 py-2 text-white font-medium rounded-md cursor-pointer">Kirim</button>
      </div>
    </>
  );
};

export default FormConfimPayment;
