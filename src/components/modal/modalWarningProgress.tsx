import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { IoIosWarning } from "react-icons/io";
interface ModalWarningProps {
  modal: boolean;
  setModal: () => void;
  message: string | null;
  handleNext: () => void;
  handleClose: () => void;
}

const ModalWarningProgress = ({ modal, setModal, message, handleNext, handleClose }: ModalWarningProps) => {
  return (
    <Modal show={modal} size="md" onClose={setModal} popup>
      <ModalHeader />
      <ModalBody>
        <div className="text-center">
          <IoIosWarning className="mx-auto mb-4 h-14 w-14 text-yellow-400 " />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{message}</h3>
          <div className="flex justify-center gap-8">
            <button
              onClick={() => {
                handleClose();
                setModal();
              }}
              className="flex flex-row items-center gap-2 bg-GREY01 py-2 px-4 rounded-md"
            >
              <span className="text-base font-medium">Kembali</span>
            </button>
            <button
              onClick={() => {
                setModal();
                setTimeout(() => {
                  handleNext();
                }, 300);
              }}
              className="flex flex-row items-center gap-2  bg-yellow-400 text-white py-2 px-4 rounded-md"
            >
              <span className="text-base font-medium">Kirim</span>
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalWarningProgress;
