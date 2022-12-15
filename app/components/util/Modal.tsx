import type { ReactNode } from "react";
import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";

type ModalProps = {
  children: ReactNode;
  redirect: string;
};

export default function Modal({ children, redirect }: ModalProps) {
  const navigate = useNavigate();
  const closeHandler = function () {
    navigate(redirect);
  };

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeHandler();
      }
    });
    return () => {
      document.removeEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closeHandler();
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modal-backdrop" onClick={closeHandler}>
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
