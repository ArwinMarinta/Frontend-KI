import { Modal } from "flowbite-react";
import FieldTextarea from "../../../../../components/input/fieldTextArea";
import useManageTerms from "../../hooks/useManageTerms";
import { createTerms, getById, updateTerms } from "../../../../../service/actions/termsActions";
import { useEffect } from "react";
import useLoadingProses from "../../../../../hooks/useLoadingProses";
import ModalLoading from "../../../../../components/modal/modalLoading";
import AddButtonModal from "../../../../../components/button/addButtonModal";

interface ModalTermProps {
  modal: boolean;
  setModal: (modal: boolean) => void;
  type: string;
  id: number | string | null;
  message: string | null;
}

const ModalTerms = ({ modal, setModal, type, id, message }: ModalTermProps) => {
  const { dispatch, terms, setTerms, termsDetail, currentPage, limit, errors, setErrors } = useManageTerms();
  const { loading, setLoading } = useLoadingProses();

  const handleSubmit = async () => {
    if (!terms.trim()) {
      setErrors(true);
      return;
    }

    if (type === "Edit" && id) {
      setLoading(true);
      try {
        await dispatch(updateTerms(id, terms, currentPage, limit));
        setModal(false);
      } finally {
        setLoading(false);
      }
    } else if (type === "Add") {
      setLoading(true);
      try {
        await dispatch(createTerms(terms, currentPage, limit));
        setModal(false);
        setTerms("");
      } finally {
        setLoading(false);
      }
    } else {
      setTerms("");
      setModal(false);
    }
  };

  useEffect(() => {
    if (modal) {
      setErrors(false);
    }
  }, [modal, setErrors]);

  useEffect(() => {
    if (type === "Edit" && id) {
      dispatch(getById(id));
    }
  }, [type, id, dispatch]);

  useEffect(() => {
    if (termsDetail && type === "Edit" && id) {
      setTerms(termsDetail?.terms || "");
    } else {
      setTerms("");
    }
  }, [termsDetail, type, id, setTerms]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTerms(value);
    if (errors && value.trim() !== "") {
      setErrors(false);
    }
  };

  return (
    <Modal show={modal} onClose={() => setModal(false)}>
      <Modal.Header>{message}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <FieldTextarea label="Syarat dan Ketentuan" value={terms} name="terms" placeholder="" required row={2} onChange={handleOnChange} error={errors} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <AddButtonModal onClick={handleSubmit} type={type} loading={loading} />
      </Modal.Footer>
      <ModalLoading show={loading} />
    </Modal>
  );
};

export default ModalTerms;
