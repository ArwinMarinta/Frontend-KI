import { Modal } from "flowbite-react";
import React, { useEffect } from "react";
import { getQuotaById, updateQuota } from "../../../../../service/actions/periodeAction";
import useManageQuota from "../../hooks/useManageQuota";
import FieldNumber from "../../../../../components/input/fieldNumber";
import { ModalProps } from "../../../../../types/modalType";
import useLoadingProses from "../../../../../hooks/useLoadingProses";
import ModalLoading from "../../../../../components/modal/modalLoading";
import AddButtonModal from "../../../../../components/button/addButtonModal";

const ModalQuota = ({ modal, setModal, type, id, message }: ModalProps) => {
  const { dispatch, form, setForm, group, currentPage, limit, quotaDetail, errors, setErrors } = useManageQuota();
  const { loading, setLoading } = useLoadingProses();

  const handleSubmit = async () => {
    const newErrors = {
      quota: form.quota === null || form.quota === undefined || isNaN(form.quota),
      remainingQuota: form.remainingQuota === null || form.remainingQuota === undefined || isNaN(form.remainingQuota),
    };

    setErrors(newErrors);

    if (newErrors.quota || newErrors.remainingQuota) return;

    if (type === "Edit" && id) {
      setLoading(true);
      try {
        await dispatch(updateQuota(id, form.quota, form.remainingQuota, group, currentPage, limit));
        setModal(false);
      } finally {
        setLoading(false);
      }
    } else {
      setForm({
        quota: 0,
        remainingQuota: 0,
      });
    }
  };

  useEffect(() => {
    if (modal) {
      setErrors({ quota: false, remainingQuota: false });
    }
  }, [modal, setErrors]);

  useEffect(() => {
    if (type === "Edit" && id) {
      dispatch(getQuotaById(id));
    }
  }, [type, id, dispatch]);

  useEffect(() => {
    if (quotaDetail && type === "Edit" && id) {
      setForm({
        quota: quotaDetail.quota ?? 0,
        remainingQuota: quotaDetail.remainingQuota ?? 0,
      });
    } else {
      setForm({
        quota: 0,
        remainingQuota: 0,
      });
    }
  }, [quotaDetail, type, id, setForm]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (value.trim() !== "") {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  return (
    <Modal show={modal} onClose={() => setModal(false)}>
      <Modal.Header>{message}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <FieldNumber label="Kuota" name="quota" value={form.quota} onChange={handleOnChange} required error={errors.quota} />
          <FieldNumber label="Sisa Kouta" name="remainingQuota" value={form.remainingQuota} onChange={handleOnChange} required error={errors.remainingQuota} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <AddButtonModal onClick={handleSubmit} type={type} loading={loading} />
      </Modal.Footer>
      <ModalLoading show={loading} />
    </Modal>
  );
};

export default ModalQuota;
