import { FC } from "react";
import { Modal } from "ui";
import { ClientForm } from "../ClientForm";

type ClientModalProps = {
  type?: "add" | "edit";
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => void;
};

export const ClientModal: FC<ClientModalProps> = ({
  type = "add",
  isOpen,
  onClose,
  onConfirm,
}) => (
  <Modal
    isOpen={isOpen}
    title={type !== "add" ? "Edit Client" : "Register New Client"}
    onClose={onClose}
  >
    <ClientForm
      onReject={onClose}
      onSubmit={(...args) => {
        onConfirm(...args);
        onClose();
      }}
    />
  </Modal>
);
