import { useEffect } from "react";
import { ModalProps } from "../../../../../types/modalType";
import useManageYear from "../../hooks/useManageYear";
import { Button, Modal } from "flowbite-react";
import { createPeriods, updatePeriods } from "../../../../../service/actions/periodeAction";

const ModalYears = ({ modal, setModal, type, id, message }: ModalProps) => {
  const { dispatch, title, setTitle, currentPage, limit, faqsDetail, setError } = useManageYear();

  const handleSubmit = async () => {
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

  //   useEffect(() => {
  //     if (type === "Edit" && id) {
  //       dispatch(getById(id));
  //     }
  //   }, [type, id, dispatch]);

  useEffect(() => {
    if (faqsDetail && type === "Edit" && id) {
      setTitle(faqsDetail.question);
    } else {
      setTitle("");
    }
  }, [faqsDetail, type, id, setTitle]);

  //   const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //     const { name, value } = e.target;
  //     setForm((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //     if (value.trim() !== "") {
  //       setErrors((prev) => ({
  //         ...prev,
  //         [name]: false,
  //       }));
  //     }
  //   };

  return (
    <Modal show={modal} onClose={() => setModal(false)}>
      <Modal.Header>{message}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <input type="number" id="year" name="year" min="1900" max="2099" step="1" placeholder="Masukkan tahun"></input>
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
