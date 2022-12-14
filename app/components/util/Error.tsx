import { ReactNode } from "react";
import { FaExclamationCircle } from "react-icons/fa";

type Error = {
    title: string;
    children: ReactNode;
};

function Error({ title, children }: Error) {
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
