import { Modal } from "flowbite-react";
import useReviewer from "../hooks/useReviewer";
import FieldDropdown from "../../../../components/input/FieldDropDown";
import { useEffect, useMemo } from "react";
import { getReviewer } from "../../../../service/actions/submissionAction";
import { updateReviewer } from "../../../../service/actions/userAction";
import ModalLoading from "../../../../components/modal/modalLoading";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../service/store";
import AddButtonModal from "../../../../components/button/addButtonModal";

export interface ModalProps {
  modal: boolean;
  setModal: (modal: boolean) => void;
  type: string;
  id: number | string | null;
  message: string | null;
  reviewer?: number;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ModalUpdateReviewer = ({ modal, setModal, type, id, message, reviewer, handleChange }: ModalProps) => {
  const { reviewerError, setReviewerError, dispatch, reviewerData, resetReviewer, loading, setLoading } = useReviewer();
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

  useEffect(() => {
    dispatch(getReviewer());
  }, [dispatch]);

  const handleSubmit = async () => {
    if (reviewer === undefined || reviewer === null) {
      setReviewerError("Reviewer tidak boleh kosong.");
      return;
    }

    setLoading(true);
    try {
      await dispatch(updateReviewer(id, reviewer, lastSegment, currentPage, limit));
      setModal(false);
      resetReviewer();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={modal}
      onClose={() => {
        setModal(false);
        resetReviewer();
      }}
    >
      <Modal.Header>{message}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <FieldDropdown
            label="Reviewer"
            name="applicationType"
            type="select"
            value={reviewer?.toString() ?? ""}
            onChange={handleChange}
            options={
              reviewerData?.map((item) => ({
                label: `${item.fullname} - ${item.email}`,
                value: item.id,
              })) ?? []
            }
            error={reviewerError}
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

export default ModalUpdateReviewer;
