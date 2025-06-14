import React, { useEffect } from "react";
import useCopyright from "../hooks/useCopyright";
import { ModalProps } from "../../../../types/modalType";
import { createCategoryCopyright, getCategoryCopyrightById, updateCategoryCopyright } from "../../../../service/actions/categoryCopyrightAction";
import { Modal } from "flowbite-react";
import Field from "../../../../components/input/fieldInput";
import useLoadingProses from "../../../../hooks/useLoadingProses";
import AddButtonModal from "../../../../components/button/addButtonModal";
import ModalLoading from "../../../../components/modal/modalLoading";

const ModalCopyright = ({ modal, setModal, type, id, message }: ModalProps) => {
  const { form, setForm, errors, setErrors, dispatch, currentPage, limit, categoryCopyrightDetail } = useCopyright();
  const { loading, setLoading } = useLoadingProses();
  const handleSubmit = async () => {
    const newErrors = {
      title: form.title.trim() === "" ? "Jenis tidak boleh kosong" : null,
    };

    setErrors(newErrors);

    if (newErrors.title) return;

    if (type === "Edit" && id) {
      setLoading(true);
      try {
        await dispatch(updateCategoryCopyright(id, form.title, currentPage, limit));
        setModal(false);
      } finally {
        setLoading(false);
      }
    } else if (type === "Add") {
      setLoading(true);
      try {
        await dispatch(createCategoryCopyright(form.title, currentPage, limit));
        setModal(false);
        setForm({
          title: "",
        });
      } finally {
        setLoading(false);
      }
    } else {
      setForm({
        title: "",
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
    if (categoryCopyrightDetail && type === "Edit" && id) {
      setForm((prev) => ({
        ...prev,
        title: categoryCopyrightDetail.title ?? "",
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        title: "",
      }));
    }
  }, [categoryCopyrightDetail, type, id, setForm]);

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
          <Field label="Jenis Hak Cipta" value={form.title} name="title" type="text" placeholder="" onChange={handleOnChange} required error={errors.title} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <AddButtonModal onClick={handleSubmit} type={type} loading={loading} />
      </Modal.Footer>
      <ModalLoading show={loading} />
    </Modal>
  );
};

export default ModalCopyright;
