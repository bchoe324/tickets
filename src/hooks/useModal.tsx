import { useState } from "react";

interface Modals {
  [key: string]: boolean;
}

const useModal = () => {
  const [modals, setModals] = useState<Modals>({});

  const openModal = (modalKey: string) => {
    setModals((prev) => ({
      ...prev,
      [modalKey]: true,
    }));
  };

  const closeModal = (modalKey: string) => {
    setModals((prev) => ({
      ...prev,
      [modalKey]: false,
    }));
  };

  const isOpen = (modalKey: string) => modals[modalKey];

  return { isOpen, openModal, closeModal };
};

export default useModal;
