import type { ReactNode } from "react";
import { FaExclamationCircle } from "react-icons/fa";

type ErrorInput = {
  title: string;
  children: ReactNode;
};

function Error({ title, children }: ErrorInput) {
  return (
    <div className="error">
      <div className="icon">
        <FaExclamationCircle />
      </div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default Error;
export type { ErrorInput };
