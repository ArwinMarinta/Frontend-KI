import React from "react";
import useStatus from "../hooks/useStatus";
import { Button, Modal } from "flowbite-react";
import ModalLoading from "../../../../components/modal/modalLoading";
import { updateSubmissionStatus } from "../../../../service/actions/userAction";

import { statusOptions } from "../../../../data/statusSubmission";
import FieldDropdown from "../../../../components/input/FieldDropDown";
// Pastikan path ini sesuai

export interface ModalProps {
  modal: boolean;
  setModal: (modal: boolean) => void;
  type: string;
  id: number | string | null;
  message: string | null;
  status?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ModalSubmissionStatus = ({ modal, setModal, type, id, message, status, handleChange }: ModalProps) => {
  const { statusError, setStatusError, resetStatus, dispatch, loading, setLoading } = useStatus();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!status || status.trim() === "") {
      setStatusError("Status tidak boleh kosong.");
      return;
    }

    setLoading(true);
    try {
      await dispatch(updateSubmissionStatus(id, status));
      setModal(false);
      resetStatus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={modal}
      onClose={() => {
        setModal(false);
        resetStatus();
      }}
    >
      <Modal.Header>{message}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <FieldDropdown
            label="Status Pengajuan (DJKI)"
            name="status"
            type="select"
            value={status ?? ""}
            onChange={handleChange}
            options={
              statusOptions?.map((item) => ({
                label: item.label,
                value: item.value,
              })) ?? []
            }
            error={!!statusError}
            need
          />
        </div>
        <ModalLoading show={loading} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit} className="bg-PRIMARY01 text-white">
          {type === "Add" ? "Tambah" : "Ubah"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSubmissionStatus;
