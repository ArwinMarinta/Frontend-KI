import React, { useMemo, useEffect} from "react";
import useStatus from "../hooks/useStatus";
import { Modal } from "flowbite-react";
import ModalLoading from "../../../../components/modal/modalLoading";
import { updateSubmissionStatus } from "../../../../service/actions/userAction";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../service/store";
import AddButtonModal from "../../../../components/button/addButtonModal";
// import FieldTextarea from "../../../../components/input/fieldTextArea";
import FieldDropdown from "../../../../components/input/FieldDropDown";
import { getAllStatusByType } from "../../../../service/actions/statusIprAction";
// import { statusOptions } from "../../../../data/statusSubmission";
// Pastikan path ini sesuai

export interface ModalProps {
  modal: boolean;
  setModal: (modal: boolean) => void;
  type: string;
  id: number | string | null;
  message: string | null;
  status?: number | string | null;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  statusType?: string;
}

const ModalSubmissionStatus = ({ modal, setModal, type, id, message, status, handleChange , statusType}: ModalProps) => {
  const { statusError, setStatusError, resetStatus, dispatch, loading, setLoading, patentAll,copyrightAll,desainIndustriAll,brandAll } = useStatus();
  const location = useLocation();
  const lastSegment = useMemo(() => {
    const parts = location.pathname.split("/");
    return parts[parts.length - 1];
  }, [location.pathname]);

  console.log("cek status di modal", status)

  const statusMap = {
    patent: patentAll,
    hakcipta: copyrightAll,
    desainIndustri: desainIndustriAll,
    brand: brandAll
  };

  const selectedStatusData = statusMap[statusType as keyof typeof statusMap] || [];

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


  useEffect(() => {
    dispatch(getAllStatusByType(statusType));
  }, [dispatch]);

  const { currentPage, limit } = paginationMap[lastSegment] ?? { currentPage: 1, limit: 10 };

  const handleSubmit = async () => {
    if (!status) {
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
          {/* <FieldTextarea label="Status Pengajuan (DJKI)" value={status ?? ""} name="status" placeholder="Masukkan status pengajuan" required row={4} onChange={handleChange} error={statusError} need /> */}
          <FieldDropdown
            label="Status Pengajuan (DJKI)"
            name="status"
            type="select"
            value={status?.toString()?? ""}
            onChange={handleChange}
            options={
              selectedStatusData.map((item) => ({
                label: item.name,
                value: item.id,
              }))
            }
            error={statusError}
            need
          />
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
