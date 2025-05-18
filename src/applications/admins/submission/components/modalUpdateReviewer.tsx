import { Button, Modal } from "flowbite-react";
import useReviewer from "../hooks/useReviewer";
import FieldDropdown from "../../../../components/input/FieldDropDown";
import { useEffect } from "react";
import { getReviewer } from "../../../../service/actions/submissionAction";
import { updateReviewer } from "../../../../service/actions/userAction";
import ModalLoading from "../../../../components/modal/modalLoading";
import { ModalProps } from "../../../../types/modalType";


const ModalUpdateReviewer = ({ modal, setModal, type, id, message }: ModalProps) => {
  const { reviewer, handleChange, reviewerError, setReviewerError, dispatch, reviewerData, resetReviewer, loading, setLoading } = useReviewer();

  useEffect(() => {
    dispatch(getReviewer());
  }, [dispatch]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (reviewer === undefined || reviewer === null) {
      setReviewerError("Reviewer tidak boleh kosong.");
      return;
    }

    setLoading(true);
    try {
      await dispatch(updateReviewer(id, reviewer));
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
            value={reviewer !== undefined ? reviewer.toString() : ""}
            onChange={handleChange}
            options={
              reviewerData?.map((item) => ({
                label: `${item.fullname} - ${item.email}`,
                value: item.id,
              })) ?? []
            }
            error={!!reviewerError}
            need
          />
        </div>
        <ModalLoading show={loading} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit} className="bg-PRIMARY01 text-white ">
          {type === "Add" ? "Tambah" : "Ubah"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUpdateReviewer;
