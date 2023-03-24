import { FC } from "react";
import { OperationType } from "types";
import { Modal } from "ui";
import { OperationForm } from "../OperationForm";

type OperationModalProps = {
  type?: "add" | "edit";
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    amount: number,
    operationType: OperationType,
    clientId: string
  ) => void;
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
    <OperationForm onReject={onClose} onSubmit={onConfirm} />
  </Modal>
);
