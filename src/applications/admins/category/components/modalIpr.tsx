import { useEffect } from "react";
import { ModalProps } from "../../../../types/modalType";
import { getIprById, updateIpr } from "../../../../service/actions/categoryIprAction";
import { Modal } from "flowbite-react";
import Field from "../../../../components/input/fieldInput";
import useIpr from "../hooks/useIpr";
import ModalLoading from "../../../../components/modal/modalLoading";
import AddButtonModal from "../../../../components/button/addButtonModal";
import useLoadingProses from "../../../../hooks/useLoadingProses";

const ModalIpr = ({ modal, setModal, type, id, message }: ModalProps) => {
  const { form, setForm, errors, setErrors, dispatch, currentPage, limit, categoryIprDetail } = useIpr();
  const { loading, setLoading } = useLoadingProses();
  const handleSubmit = async () => {
    const newErrors = {
      title: form.title.trim() === "" ? "Judul tidak boleh kosong" : null,
    };

    setErrors(newErrors);

    if (newErrors.title) return;

    if (type === "Edit" && id) {
      setLoading(true);
      try {
        await dispatch(updateIpr(id, form.title, form.isPublish, currentPage, limit));
        setModal(false);
      } finally {
        setLoading(false);
      }
    }
    // else if (type === "Add") {
    //   await dispatch(createFaq(form.question, form.answer, name, currentPage, limit));
    //   setModal(false);
    //   setForm({
    //     question: "",
    //     answer: "",
    //   });
    // }
    // else {
    //   setForm({
    //     title: "",
    //   });
    // }
  };

  useEffect(() => {
    if (modal) {
      setErrors({ title: null });
    }
  }, [modal, setErrors]);

  useEffect(() => {
    if (type === "Edit" && id) {
      dispatch(getIprById(id));
    }
  }, [type, id, dispatch]);

  useEffect(() => {
    if (categoryIprDetail && type === "Edit" && id) {
      setForm((prev) => ({
        ...prev,
        title: categoryIprDetail.title ?? "",
        isPublish: categoryIprDetail.isPublish,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        title: "",
      }));
    }
  }, [categoryIprDetail, type, id, setForm]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    const inputValue = type === "checkbox" ? checked : value;

    setForm((prev) => ({
      ...prev,
      [name]: inputValue,
    }));

    if (typeof inputValue === "string" && inputValue.trim() !== "") {
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
          <Field label="Jenis Kekayaan Intelektual" value={form.title} name="title" type="text" placeholder="" required error={errors.title} readOnly />
          <div className="flex  flex-col mb-4">
            <label className="block mb-2 text-base font-medium">Publish</label>
            <input type="checkbox" name="isPublish" checked={form.isPublish} onChange={handleOnChange} className="w-4 h-4 text-PRIMARY01 bg-gray-100 border-gray-300 rounded-md focus:ring-PRIMARY010 dark:focus:ring-PRIMARY01 dark:ring-offset-gray-800 focus:ring-1" />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <AddButtonModal onClick={handleSubmit} type={type} loading={loading} />
      </Modal.Footer>
      <ModalLoading show={loading} />
    </Modal>
  );
};

export default ModalIpr;
