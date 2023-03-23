import { useState } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);

  const onClose = () => setIsOpen(false);

  const onToogle = () => setIsOpen((prevState) => !prevState);

  return {
    isOpen,
    onOpen,
    onClose,
    onToogle,
  };
};
