import { Button, Modal } from "flowbite-react";
import React, { useEffect } from "react";
import useManageCategoryFaq from "../../hooks/useManageCategoryFaq";
import { createCategoryFaq, getCategoryFaqById, updateCategoryFaq } from "../../../../../service/actions/faqAction";
import Field from "../../../../../components/input/fieldInput";
import { ModalProps } from "../../../../../types/modalType";

const ModalCategoryFaq = ({ modal, setModal, type, id, message }: ModalProps) => {
  const { dispatch, faqs, setFaqs, faqCategoryDetail, currentPage, limit, error, setError } = useManageCategoryFaq();

  const handleSubmit = async () => {
    if (!faqs.trim()) {
      setError(true);
      return;
    }

    if (type === "Edit" && id) {
      await dispatch(updateCategoryFaq(faqCategoryDetail?.type, faqs, currentPage, limit));
      setModal(false);
    } else if (type === "Add") {
      await dispatch(createCategoryFaq(faqs, currentPage, limit));
      setModal(false);
      setFaqs("");
    } else {
      setFaqs("");
    }
  };

  useEffect(() => {
    if (type === "Edit" && id) {
      dispatch(getCategoryFaqById(id));
    }
  }, [type, id, dispatch]);

  useEffect(() => {
    if (faqCategoryDetail && type === "Edit" && id) {
      setFaqs(faqCategoryDetail?.type || "");
    } else {
      setFaqs("");
    }
  }, [faqCategoryDetail, type, id, setFaqs]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFaqs(value);
    if (error && value.trim() !== "") {
      setError(false);
    }
  };

  return (
    <Modal show={modal} onClose={() => setModal(false)}>
      <Modal.Header>{message}</Modal.Header>

      <Modal.Body>
        <div className="space-y-6">
          <Field label="Kategori FAQ" value={faqs || ""} name="faqs" type="text" placeholder="" onChange={handleOnChange} required error={error} />
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

export default ModalCategoryFaq;
