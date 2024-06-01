import { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import UserProgressContext from "../../store/user-progress-context";

function Modal({ children, open, className = '' }) {

    const userProgressCtx = useContext(UserProgressContext)

    const dialog = useRef();

    useEffect(() => {
        if (open) {
            dialog.current.showModal();
        }
        else {
            dialog.current.close();
        }
    }, [userProgressCtx.progress]);

    return (
        createPortal(
            <dialog ref={dialog} className={`modal ${className}`} onClose={() => { userProgressCtx.handleChangeProgress('looking') }}>{children}</dialog >
            , document.getElementById('modal'))
    );
}

export default Modal;