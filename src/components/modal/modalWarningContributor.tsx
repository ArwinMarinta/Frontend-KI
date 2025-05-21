import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { IoIosWarning } from "react-icons/io";
interface ModalWarningProps {
  modal: boolean;
  setModal: () => void;
  message: string | null;
  handleNext: () => void;
  handleAddContributor: () => void;
}

const ModalWarningContributor = ({ modal, setModal, message, handleNext, handleAddContributor }: ModalWarningProps) => {
  return (
    <Modal show={modal} size="md" onClose={setModal} popup>
      <ModalHeader />
      <ModalBody>
        <div className="text-center">
          <IoIosWarning className="mx-auto mb-4 h-14 w-14 text-YELLOW03 " />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{message}</h3>
          <div className="flex justify-center gap-8">
            <button
              onClick={() => {
                handleAddContributor();
                setModal();
              }}
              className="flex flex-row items-center gap-2 bg-GREY01 py-2 px-4 rounded-md"
            >
              <span className="text-base font-medium">Tambah Kontributor</span>
            </button>
            <button
              onClick={() => {
                handleNext();
                setModal();
              }}
              className="flex flex-row items-center gap-2 bg-YELLOW03 text-white py-2 px-4 rounded-md"
            >
              <span className="text-base font-medium">Selanjutnya</span>
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalWarningContributor;
