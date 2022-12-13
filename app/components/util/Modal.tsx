import type { MouseEventHandler, ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  onClose: MouseEventHandler<HTMLDivElement>;
};

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <dialog
        className="modal"
        open
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </dialog>
    </div>
  );
}
