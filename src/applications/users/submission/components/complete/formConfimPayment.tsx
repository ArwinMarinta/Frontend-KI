import { useLocation } from "react-router-dom";

import Field from "../../../../../components/input/fieldInput";
import { ConfirmPaymentError, ConfirmPaymentForm } from "../../hooks/useConfirmPayment";
import InputFile from "../field/InputFile";

export interface ConfirmPaymentProps {
  formConfirmPayment: ConfirmPaymentForm;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formConfirmPaymentErrors: ConfirmPaymentError;
  handleSubmitPayment: () => void;
}

const FormConfimPayment = ({ formConfirmPayment, handleChange, formConfirmPaymentErrors, handleSubmitPayment }: ConfirmPaymentProps) => {
  const location = useLocation();
  const { billingCode, paymentSchema } = location.state || {};

  return (
    <>
      <div className="flex items-center h-24">
        <h1 className="text-center text-3xl w-full font-bold">Konfirmasi Pembayaran Mandiri</h1>
      </div>
      <div className="flex flex-col gap-6">
        <Field label="Skema Pendanaan" value={paymentSchema ?? "-"} name="titleInvention" type="text" placeholder="" readOnly />
        <Field label="Kode Pembayaran Anda" value={billingCode || "-"} name="titleInvention" type="text" placeholder="" readOnly />
        <InputFile label="Bukti Pembayaran" value={formConfirmPayment.proofPayment} onChange={handleChange} error={!!formConfirmPaymentErrors.proofPayment} name="proofPayment" required need />
      </div>
      <div className="flex justify-end mt-6">
        <button onClick={handleSubmitPayment} className="bg-PRIMARY01 px-6 py-2 text-white font-medium rounded-md cursor-pointer">
          Kirim
        </button>
      </div>
    </>
  );
};

export default FormConfimPayment;
