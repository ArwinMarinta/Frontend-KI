import { Modal, ModalBody, ModalHeader } from "flowbite-react";

import { HiOutlineExclamationCircle } from "react-icons/hi";

interface ModalWarningProps {
  modal: boolean;
  setModal: () => void;
  id: number | string | null;
  message: string | null;
  handleDelete: (id: number | string | null) => void;
}

const ModalWarning = ({ modal, setModal, id, message, handleDelete }: ModalWarningProps) => {
  return (
    <Modal show={modal} size="md" onClose={setModal} popup>
      <ModalHeader />
      <ModalBody>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-RED01 " />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{message}</h3>
          <div className="flex justify-center gap-8">
            <button onClick={setModal} className="flex flex-row items-center gap-2 bg-GREY01 py-2 px-4 rounded-md">
              <span className="text-base font-medium">Kembali</span>
            </button>
            <button
              onClick={async () => {
                try {
                  await handleDelete(id);
                  setModal();
                } catch {
                  return;
                }
              }}
              className="flex flex-row items-center gap-2 bg-RED01 text-white py-2 px-4 rounded-md"
            >
              <span className="text-base font-medium">Hapus</span>
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalWarning;
