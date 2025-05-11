import { useState } from "react";

export const useModal = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [id, setId] = useState<number | string | null>(null);
  const [message, setMessage] = useState<string | null>("");
  const [type, setType] = useState<string>("");

  const handleOpenModal = (id: number | string | null, modalType: string) => {
    setActiveModal(modalType);
    setId(id ?? null);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setId(null);
  };

  return {
    activeModal,
    handleOpenModal,
    handleCloseModal,
    id,
    setId,
    message,
    setMessage,
    type,
    setType,
  };
};
