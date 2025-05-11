import React, { useEffect } from "react";
import { ModalProps } from "../../../../types/modalType";
import { createCategorySubIndusDesign, getCategorySubIndusDesigntById, updateCategorySubIndusDesign } from "../../../../service/actions/categoryIndusDesignAction";
import { Button, Modal } from "flowbite-react";
import Field from "../../../../components/input/fieldInput";
import useSubIndusDesign from "../hooks/useSubIndusDesign";

const ModalSubIndusDesign = ({ modal, setModal, type, id, message }: ModalProps) => {
  const { form, setForm, errors, setErrors, dispatch, currentPage, limit, categorySubIndustrialDesignDetail, ids } = useSubIndusDesign();

  const handleSubmit = async () => {
    const newErrors = {
      title: form.title.trim() === "",
    };

    setErrors(newErrors);

    if (newErrors.title) return;

    if (type === "Edit" && id) {
      await dispatch(updateCategorySubIndusDesign(id, ids, form.title, currentPage, limit));
      setModal(false);
    } else if (type === "Add") {
      await dispatch(createCategorySubIndusDesign(ids, form.title, currentPage, limit));
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
      dispatch(getCategorySubIndusDesigntById(id));
    }
  }, [type, id, dispatch]);

  useEffect(() => {
    if (categorySubIndustrialDesignDetail && type === "Edit" && id) {
      setForm((prev) => ({
        ...prev,
        title: categorySubIndustrialDesignDetail.title ?? "",
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        title: "",
      }));
    }
  }, [categorySubIndustrialDesignDetail, type, id, setForm]);

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
          <Field label="Sub-Jenis Desain Industri" value={form.title} name="title" type="text" placeholder="" onChange={handleOnChange} required error={errors.title} />
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

export default ModalSubIndusDesign;
