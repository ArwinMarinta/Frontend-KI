import React, { useEffect } from "react";
import useManageGroup from "../../hooks/useManageGroup";
import { Modal } from "flowbite-react";
import { createGroup, getGroupById, updateGroup } from "../../../../../service/actions/periodeAction";
import { ModalProps } from "../../../../../types/modalType";
import Field from "../../../../../components/input/fieldInput";
import { toInputDateFormat } from "../../../../../utils/formatDate";
import useLoadingProses from "../../../../../hooks/useLoadingProses";
import ModalLoading from "../../../../../components/modal/modalLoading";
import AddButtonModal from "../../../../../components/button/addButtonModal";

const ModalGroup = ({ modal, setModal, type, id, message }: ModalProps) => {
  const { dispatch, form, setForm, years, currentPage, limit, groupDetail, errors, setErrors } = useManageGroup();
  const { loading, setLoading } = useLoadingProses();
  const handleSubmit = async () => {
    const newErrors = {
      group: form.group.trim() === "",
      startDate: form.startDate === null || form.startDate.trim() === "",
      endDate: form.endDate === null || form.endDate.trim() === "",
    };

    setErrors(newErrors);

    if (newErrors.group || newErrors.startDate || newErrors.endDate) return;

    if (type === "Edit" && id) {
      setLoading(true);
      try {
        await dispatch(updateGroup(id, form.group, form.startDate, form.endDate, years, currentPage, limit));
        setModal(false);
      } finally {
        setLoading(false);
      }
    } else if (type === "Add") {
      setLoading(true);
      try {
        await dispatch(createGroup(form.group, form.startDate, form.endDate, years, currentPage, limit));
        setModal(false);
        setForm({
          group: "",
          startDate: "",
          endDate: "",
        });
      } finally {
        setLoading(false);
      }
    } else {
      setForm({
        group: "",
        startDate: "",
        endDate: "",
      });
    }
  };

  useEffect(() => {
    if (modal) {
      setErrors({ group: false, startDate: false, endDate: false });
    }
  }, [modal, setErrors]);

  useEffect(() => {
    if (type === "Edit" && id) {
      dispatch(getGroupById(id));
    }
  }, [type, id, dispatch]);

  useEffect(() => {
    if (groupDetail && type === "Edit" && id) {
      setForm({
        group: groupDetail.group,
        startDate: groupDetail.startDate ? toInputDateFormat(groupDetail.startDate) : "",
        endDate: groupDetail.endDate ? toInputDateFormat(groupDetail.endDate) : "",
      });
    } else {
      setForm({
        group: "",
        startDate: "",
        endDate: "",
      });
    }
  }, [groupDetail, type, id, setForm]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    let newValue = value;
    if ((name === "startDate" || name === "endDate") && value) {
      const dateValue = new Date(value);

      // Periksa apakah tanggal valid
      if (!isNaN(dateValue.getTime())) {
        newValue = dateValue.toISOString().split("T")[0];
      } else {
        newValue = "";
      }
    }

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
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
          <Field label="Nama Gelombang" value={form.group} name="group" type="text" placeholder="" onChange={handleOnChange} required error={errors.group} />
          <div className="flex items-center gap-4 w-full">
            <div className="w-full">
              <label htmlFor="startDate" className="block mb-2 text-base font-medium">
                Waktu Mulai
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={form.startDate || ""}
                onChange={handleOnChange}
                className={`bg-gray-50 border ${errors.startDate ? "border-RED01 ring-RED01 focus:ring-RED01 focus:border-RED01" : "border-BORDER01 focus:ring-PRIMARY01 focus:border-PRIMARY01"} text-base rounded-md block w-full p-2`}
              />
              {errors.startDate && <p className="text-sm text-RED01 mt-1">Field Tidak Boleh Kosong!</p>}
            </div>

            <span className="mt-6 text-gray-500">Hingga</span>

            {/* End Date */}
            <div className="w-full">
              <label htmlFor="endDate" className="block mb-2 text-base font-medium">
                Waktu Akhir
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={form.endDate || ""}
                onChange={handleOnChange}
                className={`bg-gray-50 border ${errors.endDate ? "border-RED01 ring-RED01 focus:ring-RED01 focus:border-RED01" : "border-BORDER01 focus:ring-PRIMARY01 focus:border-PRIMARY01"} text-base rounded-md block w-full p-2`}
              />
              {errors.endDate && <p className="text-sm text-RED01 mt-1">Field Tidak Boleh Kosong!</p>}
            </div>
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

export default ModalGroup;
