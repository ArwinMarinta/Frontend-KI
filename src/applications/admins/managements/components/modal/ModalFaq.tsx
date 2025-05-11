import { Button, Modal } from "flowbite-react";
import useManageFaq from "../../hooks/useManageFaq";
import FieldTextarea from "../../../../../components/input/fieldTextArea";
import { createFaq, getFaqById, updateFaq } from "../../../../../service/actions/faqAction";
import { useEffect } from "react";
import { ModalProps } from "../../../../../types/modalType";

const ModalFaq = ({ modal, setModal, type, id, message }: ModalProps) => {
  const { dispatch, form, setForm, name, currentPage, limit, faqsDetail, errors, setErrors } = useManageFaq();

  const handleSubmit = async () => {
    const newErrors = {
      question: form.question.trim() === "",
      answer: form.answer.trim() === "",
    };

    setErrors(newErrors);

    if (newErrors.question || newErrors.answer) return;

    if (type === "Edit" && id) {
      await dispatch(updateFaq(id, form.question, form.answer, name, currentPage, limit));
      setModal(false);
    } else if (type === "Add") {
      await dispatch(createFaq(form.question, form.answer, name, currentPage, limit));
      setModal(false);
      setForm({
        question: "",
        answer: "",
      });
    } else {
      setForm({
        question: "",
        answer: "",
      });
    }
  };

  useEffect(() => {
    if (modal) {
      setErrors({ question: false, answer: false });
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
        [name]: false,
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
        <Button onClick={handleSubmit} className="bg-PRIMARY01 text-white ">
          {type === "Add" ? "Tambah" : "Ubah"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalFaq;
