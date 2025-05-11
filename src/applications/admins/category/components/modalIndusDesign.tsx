import React, { useEffect } from "react";
import { ModalProps } from "../../../../types/modalType";
import { createCategoryIndusDesign, getCategoryIndusDesignById, updateCategoryIndusDesign } from "../../../../service/actions/categoryIndusDesignAction";
import { Button, Modal } from "flowbite-react";
import Field from "../../../../components/input/fieldInput";
import useIndusDesign from "../hooks/useIndusDesign";

const ModalIndusDesign = ({ modal, setModal, type, id, message }: ModalProps) => {
  const { form, setForm, errors, setErrors, dispatch, currentPage, limit, categoryIndustrialDesignDetail } = useIndusDesign();

  const handleSubmit = async () => {
    const newErrors = {
      title: form.title.trim() === "",
    };

    setErrors(newErrors);

    if (newErrors.title) return;

    if (type === "Edit" && id) {
      await dispatch(updateCategoryIndusDesign(id, form.title, currentPage, limit));
      setModal(false);
    } else if (type === "Add") {
      await dispatch(createCategoryIndusDesign(form.title, currentPage, limit));
      setModal(false);
      setForm({
        title: "",
      });
    } else {
      setForm({
        title: "",
      });
    }
  };

  useEffect(() => {
    if (modal) {
      setErrors({ title: false });
    }
  }, [modal, setErrors]);

  useEffect(() => {
    if (type === "Edit" && id) {
      dispatch(getCategoryIndusDesignById(id));
    }
  }, [type, id, dispatch]);

  useEffect(() => {
    if (categoryIndustrialDesignDetail && type === "Edit" && id) {
      setForm((prev) => ({
        ...prev,
        title: categoryIndustrialDesignDetail.title ?? "",
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        title: "",
      }));
    }
  }, [categoryIndustrialDesignDetail, type, id, setForm]);

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
          <Field label="Jenis Desain Industri" value={form.title} name="title" type="text" placeholder="" onChange={handleOnChange} required error={errors.title} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit} className="bg-PRIMARY01 text-white ">
          {type === "Add" ? "Tambah" : "Ubah"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalIndusDesign;
