import { Modal } from "flowbite-react";
import React, { useEffect } from "react";
import useManageCategoryFaq from "../../hooks/useManageCategoryFaq";
import { createCategoryFaq, getCategoryFaqById, updateCategoryFaq } from "../../../../../service/actions/faqAction";
import Field from "../../../../../components/input/fieldInput";
import { ModalProps } from "../../../../../types/modalType";
import ModalLoading from "../../../../../components/modal/modalLoading";
import AddButtonModal from "../../../../../components/button/addButtonModal";
import useLoadingProses from "../../../../../hooks/useLoadingProses";

const ModalCategoryFaq = ({ modal, setModal, type, id, message }: ModalProps) => {
  const { dispatch, faqs, setFaqs, faqCategoryDetail, currentPage, limit, error, setError } = useManageCategoryFaq();
  const { loading, setLoading } = useLoadingProses();
  const handleSubmit = async () => {
    if (!faqs.trim()) {
      setError("Kategori tidak boleh kosong");
      return;
    }

    if (type === "Edit" && id) {
      setLoading(true);
      try {
        await dispatch(updateCategoryFaq(faqCategoryDetail?.type, faqs, currentPage, limit));
        setModal(false);
      } finally {
        setLoading(false);
      }
    } else if (type === "Add") {
      setLoading(true);
      try {
        await dispatch(createCategoryFaq(faqs, currentPage, limit));
        setModal(false);
        setFaqs("");
      } finally {
        setLoading(false);
      }
    } else {
      setFaqs("");
    }
  };

  useEffect(() => {
    if (modal) {
      setError(null);
    }
  }, [modal, setError]);

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
      setError(null);
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
        <AddButtonModal onClick={handleSubmit} type={type} loading={loading} />
      </Modal.Footer>
      <ModalLoading show={loading} />
    </Modal>
  );
};

export default ModalCategoryFaq;
