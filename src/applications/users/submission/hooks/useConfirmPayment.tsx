import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../../service/store";
import useLoadingProses from "../../../../hooks/useLoadingProses";
import { confirmPayment } from "../../../../service/actions/submissionAction";
import { toSlug } from "../../../../utils/toSlug";

export type ConfirmPaymentForm = {
  proofPayment: File | null;
  paymentStatus: boolean;
};

export type ConfirmPaymentError = {
  proofPayment?: string;
  paymentStatus?: string;
};

const useConfirmPayment = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, setLoading } = useLoadingProses();
  const { submissionType, paymentId } = location.state || {};
  const navigate = useNavigate();
  const [formConfirmPayment, setFormConfirmPayment] = useState<ConfirmPaymentForm>({
    proofPayment: null,
    paymentStatus: true,
  });

  const [formConfirmPaymentErrors, setFormConfirmPaymentErrors] = useState<ConfirmPaymentError>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, files } = e.target;

    if (type === "file") {
      setFormConfirmPayment((prev) => ({
        ...prev,
        [name]: files?.[0] || null,
      }));
    } else {
      setFormConfirmPayment((prev) => ({
        ...prev,
        [name]: e.target.value,
      }));
    }

    setFormConfirmPaymentErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const validateConfirmPayment = (data: typeof formConfirmPayment) => {
    return {
      proofPayment: !data.proofPayment ? "Bukti pembayaran harus diunggah" : "",
    };
  };

  const handleSubmitPayment = async () => {
    const error = validateConfirmPayment(formConfirmPayment);
    const hasError = Object.values(error).some((val) => val !== "");

    if (hasError) {
      setFormConfirmPaymentErrors(error);
      return;
    }
    setLoading(true);
    try {
      await dispatch(confirmPayment(paymentId, formConfirmPayment.proofPayment));

      setFormConfirmPayment({
        proofPayment: null,
        paymentStatus: true,
      });
      navigate(`/histori-pengajuan/${toSlug(submissionType)}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    formConfirmPayment,
    setFormConfirmPayment,
    handleChange,
    formConfirmPaymentErrors,
    handleSubmitPayment,
    loading,
  };
};

export default useConfirmPayment;
