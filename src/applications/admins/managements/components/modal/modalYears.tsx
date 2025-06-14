import { useEffect } from "react";
import { ModalProps } from "../../../../../types/modalType";
import useManageYear from "../../hooks/useManageYear";
import { Modal } from "flowbite-react";
import { createPeriods, updatePeriods } from "../../../../../service/actions/periodeAction";
import Field from "../../../../../components/input/fieldInput";
import useLoadingProses from "../../../../../hooks/useLoadingProses";
import ModalLoading from "../../../../../components/modal/modalLoading";
import AddButtonModal from "../../../../../components/button/addButtonModal";

const ModalYears = ({ modal, setModal, type, id, message }: ModalProps) => {
  const { dispatch, title, setTitle, currentPage, limit, faqsDetail, setError, error } = useManageYear();
  const { loading, setLoading } = useLoadingProses();

  const handleSubmit = async () => {
    if (!title || !title.trim()) {
      setError("Tahun Pendanaan tidak boleh kosong");
      return;
    }
    if (type === "Edit" && id) {
      setLoading(true);
      try {
        await dispatch(updatePeriods(id, title, currentPage, limit));
        setModal(false);
      } finally {
        setLoading(false);
      }
    } else if (type === "Add") {
      setLoading(true);
      try {
        await dispatch(createPeriods(title, currentPage, limit));
        setModal(false);
        setTitle("");
      } finally {
        setLoading(false);
      }
    } else {
      setTitle("");
    }
  };

  useEffect(() => {
    if (modal) {
      setError(null);
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
                setError("Tahun Pendanaan tidak boleh kosong");
              } else {
                setError(null);
              }
            }}
            error={error}
            need
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <AddButtonModal onClick={handleSubmit} type={type} loading={loading} />
      </Modal.Footer>
      <ModalLoading show={loading} />
    </Modal>
  );
};

export default ModalYears;
