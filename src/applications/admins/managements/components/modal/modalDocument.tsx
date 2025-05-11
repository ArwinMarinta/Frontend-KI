import { useEffect } from "react";
import { ModalProps } from "../../../../../types/modalType";
import { Button, Modal } from "flowbite-react";
import { createDocument, getDocumentById, updateDocument } from "../../../../../service/actions/documentAction";
import Field from "../../../../../components/input/fieldInput";
import useManageDocument from "../../hooks/useManageDocument";
import FieldFile from "../../../../../components/input/fieldFile";
const ModalDocument = ({ modal, setModal, type, id, message }: ModalProps) => {
  const { dispatch, form, setForm, name, currentPage, limit, documentDetail, errors, setErrors } = useManageDocument();

  const handleSubmit = async () => {
    const newErrors = {
      title: form.title.trim() === "",
      document: form.document === null && form.documentName === "",
      cover: form.cover === null && form.coverName === "",
    };

    setErrors(newErrors);

    if (newErrors.title || newErrors.document || newErrors.cover) return;

    if (type === "Edit" && id) {
      await dispatch(updateDocument(id, form.title, form.document, form.cover, name, currentPage, limit));
      setModal(false);
    } else if (type === "Add") {
      await dispatch(createDocument(form.title, form.document, form.cover, name, currentPage, limit));
      setModal(false);
      setForm({
        title: "",
        document: null,
        documentName: "",
        cover: null,
        coverName: "",
      });
    } else {
      setForm({
        title: "",
        document: null,
        documentName: "",
        cover: null,
        coverName: "",
      });
    }
  };

  useEffect(() => {
    if (modal) {
      setErrors({ title: false, document: false, cover: false });
    }
  }, [modal, setErrors]);

  useEffect(() => {
    if (type === "Edit" && id) {
      dispatch(getDocumentById(id));
    }
  }, [type, id, dispatch]);

  useEffect(() => {
    if (documentDetail && type === "Edit" && id) {
      setForm({
        title: documentDetail.title,
        document: null,
        documentName: documentDetail.document ?? "",
        cover: null,
        coverName: documentDetail.cover ?? "",
      });
      if (documentDetail.document) {
        setErrors((prev) => ({
          ...prev,
          document: false,
        }));
      }
    } else {
      setForm({
        title: "",
        document: null,
        documentName: "",
        cover: null,
        coverName: "",
      });
    }
  }, [documentDetail, type, id, setForm, setErrors]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      const file = e.target.files?.[0];
      if (file) {
        const fileExtension = file.name.split(".").pop()?.toLowerCase();
        const allowedExtensions = name === "document" ? ["pdf", "doc", "docx"] : ["jpg", "jpeg", "png", "webp"];

        if (!allowedExtensions.includes(fileExtension || "")) {
          alert(name === "document" ? "Hanya file PDF atau Word yang diizinkan." : "Hanya file gambar (JPG, PNG, WebP) yang diizinkan.");
          setForm((prev) => ({
            ...prev,
            [name]: null,
            ...(name === "document" && { documentName: "" }),
            ...(name === "cover" && { coverName: "" }),
          }));
          return;
        }

        setForm((prev) => ({
          ...prev,
          [name]: file,
          ...(name === "document" && { documentName: file.name }),
          ...(name === "cover" && { coverName: file.name }),
        }));

        setErrors((prev) => ({
          ...prev,
          [name]: false,
        }));
      }
    } else {
      const value = e.target.value;
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
    }
  };

  return (
    <Modal show={modal} onClose={() => setModal(false)}>
      <Modal.Header>{message}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <Field label="Judul Dokumen" value={form.title} name="title" type="text" placeholder="" onChange={handleOnChange} required error={errors.title} />
          <FieldFile label="Cover Dokumen" value={form.cover} name="cover" required onChange={handleOnChange} error={errors.document} placeholder={form.documentName} accept=".jpg, .jpeg, .png, .webp" />
          <FieldFile label="Dokumen" value={form.document} name="document" required onChange={handleOnChange} error={errors.document} placeholder={form.documentName} />

          {/* {form.documentName && (
            <p className="text-sm text-gray-500 mt-1">
              File sebelumnya: <span className="font-medium">{form.documentName}</span>
            </p>
          )} */}
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

export default ModalDocument;
