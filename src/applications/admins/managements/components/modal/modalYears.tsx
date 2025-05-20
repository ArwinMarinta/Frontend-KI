import { useEffect } from "react";
import { ModalProps } from "../../../../../types/modalType";
import useManageYear from "../../hooks/useManageYear";
import { Button, Modal } from "flowbite-react";
import { createPeriods, updatePeriods } from "../../../../../service/actions/periodeAction";
import Field from "../../../../../components/input/fieldInput";

const ModalYears = ({ modal, setModal, type, id, message }: ModalProps) => {
  const { dispatch, title, setTitle, currentPage, limit, faqsDetail, setError, error } = useManageYear();

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError(true);
      return;
    }
    if (type === "Edit" && id) {
      await dispatch(updatePeriods(id, title, currentPage, limit));
      setModal(false);
    } else if (type === "Add") {
      await dispatch(createPeriods(title, currentPage, limit));
      setModal(false);
      setTitle("");
    } else {
      setTitle("");
    }
  };

  useEffect(() => {
    if (modal) {
      setError(false);
    }
  }, [modal, setError]);

  useEffect(() => {
    if (faqsDetail && type === "Edit" && id) {
      setTitle(faqsDetail.question);
    } else {
      setTitle("");
    }
  }, [faqsDetail, type, id, setTitle]);

  return (
    <Modal show={modal} onClose={() => setModal(false)}>
      <Modal.Header>{message}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <Field
            label="Tahun Pendanaan"
            value={title}
            name="text"
            type="number"
            placeholder=""
            onChange={(e) => {
              const value = e.target.value;
              setTitle(value);
              if (value.trim() === "") {
                setError(true);
              } else {
                setError(false);
              }
            }}
            error={error}
            need
          />
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

export default ModalYears;
