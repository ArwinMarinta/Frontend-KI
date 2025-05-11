import { useEffect } from "react";
import useManageCategoryDocument from "../../hooks/useManageCategoryDocument";
import { createCategoryDocument, getCategoryDocumentById, updateCategoryDocument } from "../../../../../service/actions/documentAction";
import { Button, Modal } from "flowbite-react";
import Field from "../../../../../components/input/fieldInput";
import { ModalProps } from "../../../../../types/modalType";

const ModalCategoryDocument = ({ modal, setModal, type, id, message }: ModalProps) => {
  const { errors, setErrors, dispatch, types, setTypes, categoryDocumentDetail, currentPage, limit } = useManageCategoryDocument();

  const handleSubmit = async () => {
    if (!types.trim()) {
      setErrors(true);
      return;
    }
    if (type === "Edit" && id) {
      await dispatch(updateCategoryDocument(categoryDocumentDetail?.type, types, currentPage, limit));
      setModal(false);
    } else if (type === "Add") {
      await dispatch(createCategoryDocument(types, currentPage, limit));
      setModal(false);
      setTypes("");
    } else {
      setTypes("");
    }
  };

  useEffect(() => {
    if (modal) {
      setErrors(false);
    }
  }, [modal, setErrors]);

  useEffect(() => {
    if (type === "Edit" && id) {
      dispatch(getCategoryDocumentById(id));
    }
  }, [type, id, dispatch]);

  useEffect(() => {
    if (categoryDocumentDetail && type === "Edit" && id) {
      setTypes(categoryDocumentDetail?.type || "");
    } else {
      setTypes("");
    }
  }, [categoryDocumentDetail, type, id, setTypes]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTypes(value);
    if (errors && value.trim() !== "") {
      setErrors(false);
    }
  };

  return (
    <Modal show={modal} onClose={() => setModal(false)}>
      <Modal.Header>{message}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <Field label="Kategori Unduhan" value={types || ""} name="types" type="text" placeholder="" onChange={handleOnChange} required error={errors} />
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

export default ModalCategoryDocument;
