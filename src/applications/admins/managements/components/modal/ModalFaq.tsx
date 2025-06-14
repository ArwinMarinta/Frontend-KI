import { Modal } from "flowbite-react";
import useManageFaq from "../../hooks/useManageFaq";
import FieldTextarea from "../../../../../components/input/fieldTextArea";
import { createFaq, getFaqById, updateFaq } from "../../../../../service/actions/faqAction";
import { useEffect } from "react";
import { ModalProps } from "../../../../../types/modalType";
import useLoadingProses from "../../../../../hooks/useLoadingProses";
import ModalLoading from "../../../../../components/modal/modalLoading";
import AddButtonModal from "../../../../../components/button/addButtonModal";

const ModalFaq = ({ modal, setModal, type, id, message }: ModalProps) => {
  const { dispatch, form, setForm, name, currentPage, limit, faqsDetail, errors, setErrors } = useManageFaq();
  const { loading, setLoading } = useLoadingProses();
  const handleSubmit = async () => {
    const newErrors = {
      question: form.question.trim() === "" ? "Pertanyaan tidak boleh kosong" : null,
      answer: form.answer.trim() === "" ? "Jawaban tidak boleh kosong" : null,
    };

    setErrors(newErrors);

    if (newErrors.question || newErrors.answer) return;

    if (type === "Edit" && id) {
      setLoading(true);
      try {
        await dispatch(updateFaq(id, form.question, form.answer, name, currentPage, limit));
        setModal(false);
      } finally {
        setLoading(false);
      }
    } else if (type === "Add") {
      setLoading(true);
      try {
        await dispatch(createFaq(form.question, form.answer, name, currentPage, limit));
        setModal(false);
        setForm({
          question: "",
          answer: "",
        });
      } finally {
        setLoading(false);
      }
    } else {
      setForm({
        question: "",
        answer: "",
      });
    }
  };

  useEffect(() => {
    if (modal) {
      setErrors({ question: null, answer: null });
    }
  }, [modal, setErrors]);

  useEffect(() => {
    if (type === "Edit" && id) {
      dispatch(getFaqById(id));
    }
  }, [type, id, dispatch]);

  useEffect(() => {
    if (faqsDetail && type === "Edit" && id) {
      setForm({
        question: faqsDetail.question,
        answer: faqsDetail.answer,
      });
    } else {
      setForm({
        question: "",
        answer: "",
      });
    }
  }, [faqsDetail, type, id, setForm]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (value.trim() !== "") {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  return (
    <Modal show={modal} onClose={() => setModal(false)}>
      <Modal.Header>{message}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <FieldTextarea label="Pertanyaan" value={form.question} name="question" placeholder="" required row={2} onChange={handleOnChange} error={errors.question} />
          <FieldTextarea label="Jawaban" value={form.answer} name="answer" placeholder="" required row={4} onChange={handleOnChange} error={errors.answer} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <AddButtonModal onClick={handleSubmit} type={type} loading={loading} />
      </Modal.Footer>
      <ModalLoading show={loading} />
    </Modal>
  );
};

export default ModalFaq;
