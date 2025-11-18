import React, { useEffect } from "react";
// import useCopyright from "../hooks/useCopyright";
import {  getCategoryCopyrightById,  } from "../../../../service/actions/categoryCopyrightAction";
import { Modal } from "flowbite-react";
import Field from "../../../../components/input/fieldInput";
import useLoadingProses from "../../../../hooks/useLoadingProses";
import AddButtonModal from "../../../../components/button/addButtonModal";
import ModalLoading from "../../../../components/modal/modalLoading";
import useStatus from "../hooks/useStatus";
import { storeStatusIpr, updateStatusIpr } from "../../../../service/actions/statusIprAction";

export interface ModalStatusProps {
  modal: boolean;
  setModal: (modal: boolean) => void;
  type: string;
  id: number | string | null;
  message: string | null;
  flag: string;
}

const ModalStatus = ({ modal, setModal, type, id, message, flag }: ModalStatusProps) => {
  // const { form, setForm, errors, setErrors, dispatch, currentPage, limit, categoryCopyrightDetail } = useCopyright();
  const { form, setForm, errors, setErrors, dispatch, currentPage, limit, detailStatus } = useStatus()
  const { loading, setLoading } = useLoadingProses();
  const handleSubmit = async () => {
    const newErrors = {
      title: form.title.trim() === "" ? "Status tidak boleh kosong" : null,
    };

    setErrors(newErrors);

    if (newErrors.title) return;

    if (type === "Edit" && id) {
      setLoading(true);
      try {
        await dispatch(updateStatusIpr(id, flag, form.title, currentPage, limit));
        setModal(false);
      } finally {
        setLoading(false);
      }
    } else if (type === "Add") {
      setLoading(true);
      try {
        await dispatch(storeStatusIpr(flag, form.title, limit, currentPage));
        setModal(false);
        setForm({
          title: "",
          type: "",
        });
      } finally {
        setLoading(false);
      }
    } else {
      setForm({
        title: "",
        type: "",
      });
    }
  };

  useEffect(() => {
    if (modal) {
      setErrors({ title: null });
    }
  }, [modal, setErrors]);

  useEffect(() => {
    if (type === "Edit" && id) {
      dispatch(getCategoryCopyrightById(id));
    }
  }, [type, id, dispatch]);

  useEffect(() => {
    if (detailStatus && type === "Edit" && id) {
      setForm((prev) => ({
        ...prev,
        title: detailStatus.name ?? "",
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        title: "",
      }));
    }
  }, [detailStatus, type, id, setForm]);

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
          <Field label="Status" value={form.title} name="title" type="text" placeholder="" onChange={handleOnChange} required error={errors.title} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <AddButtonModal onClick={handleSubmit} type={type} loading={loading} />
      </Modal.Footer>
      <ModalLoading show={loading} />
    </Modal>
  );
};

export default ModalStatus;
