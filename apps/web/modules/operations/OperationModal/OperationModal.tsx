import { FC } from "react";
import { AddOperationArgs } from "store/features/operations/operationsApiSlice";
import { Modal } from "ui";
import { OperationForm } from "../OperationForm";

type OperationModalProps = {
  type?: "add" | "edit";
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (obj: AddOperationArgs) => void;
};

export const OperationModal: FC<OperationModalProps> = ({
  type = "add",
  isOpen,
  onClose,
  onConfirm,
}) => (
  <Modal
    isOpen={isOpen}
    title={type !== "add" ? "Edit Operation" : "Request New Operation"}
    onClose={onClose}
  >
    <OperationForm
      onReject={onClose}
      onSubmit={(...args) => {
        onConfirm(...args);
        onClose();
      }}
    />
  </Modal>
);
