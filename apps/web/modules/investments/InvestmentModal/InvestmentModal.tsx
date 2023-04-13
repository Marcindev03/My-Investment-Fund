import { FC } from "react";
import { AddInvestmentArgs } from "store/features/investments/investmentsApiSlice";
import { Modal } from "ui";
import { InvestmentForm } from "../InvestmentForm";

type InvestmentModalProps = {
  type?: "add" | "edit";
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (obj: AddInvestmentArgs) => void;
};

export const InvestmentModal: FC<InvestmentModalProps> = ({
  type = "add",
  isOpen,
  onClose,
  onConfirm,
}) => (
  <Modal
    isOpen={isOpen}
    title={type !== "add" ? "Edit Investment" : "Request New Investment"}
    onClose={onClose}
  >
    <InvestmentForm
      onReject={onClose}
      onSubmit={(...args) => {
        onConfirm(...args);
        onClose();
      }}
    />
  </Modal>
);
