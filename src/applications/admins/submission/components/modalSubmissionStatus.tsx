import React, { useMemo } from "react";
import useStatus from "../hooks/useStatus";
import { Modal } from "flowbite-react";
import ModalLoading from "../../../../components/modal/modalLoading";
import { updateSubmissionStatus } from "../../../../service/actions/userAction";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../service/store";
import AddButtonModal from "../../../../components/button/addButtonModal";
import FieldTextarea from "../../../../components/input/fieldTextArea";
// Pastikan path ini sesuai

export interface ModalProps {
  modal: boolean;
  setModal: (modal: boolean) => void;
  type: string;
  id: number | string | null;
  message: string | null;
  status?: string;
  handleChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ModalSubmissionStatus = ({ modal, setModal, type, id, message, status, handleChange }: ModalProps) => {
  const { statusError, setStatusError, resetStatus, dispatch, loading, setLoading } = useStatus();
  const location = useLocation();
  const lastSegment = useMemo(() => {
    const parts = location.pathname.split("/");
    return parts[parts.length - 1];
  }, [location.pathname]);

  const { copyrightData, patentData, brandData, industrialDesignData } = useSelector((state: RootState) => state.submission);

  const paginationMap: Record<string, { currentPage: number; limit: number } | undefined> = {
    "hak-cipta": {
      currentPage: copyrightData.currentPage,
      limit: copyrightData.limit,
    },
    paten: {
      currentPage: patentData.currentPage,
      limit: patentData.limit,
    },
    merek: {
      currentPage: brandData.currentPage,
      limit: brandData.limit,
    },
    "desain-industri": {
      currentPage: industrialDesignData.currentPage,
      limit: industrialDesignData.limit,
    },
  };

  const { currentPage, limit } = paginationMap[lastSegment] ?? { currentPage: 1, limit: 10 };

  const handleSubmit = async () => {
    if (!status || status.trim() === "") {
      setStatusError("Status tidak boleh kosong.");
      return;
    }

    setLoading(true);
    try {
      await dispatch(updateSubmissionStatus(id, status, lastSegment, currentPage, limit));
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
          <FieldTextarea label="Status Pengajuan (DJKI)" value={status ?? ""} name="status" placeholder="Masukkan status pengajuan" required row={4} onChange={handleChange} error={statusError} need />
          {/* <FieldDropdown
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
            error={statusError}
            need
          /> */}
        </div>
        <ModalLoading show={loading} />
      </Modal.Body>
      <Modal.Footer>
        <AddButtonModal onClick={handleSubmit} type={type} loading={loading} />
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSubmissionStatus;
