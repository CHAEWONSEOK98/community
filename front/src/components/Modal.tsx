import { createPortal } from "react-dom";
import Backdrop from "./Backdrop";
import ModalOverlay from "./ModalOverlay";

const modalElement = document.querySelector("#modal") as HTMLElement;

interface ModalProps {
  setModal: boolean;
}

const Modal = ({ setModal }: ModalProps) => {
  return (
    <>
      {createPortal(
        <>
          <Backdrop />
          <ModalOverlay setModal={setModal} />
        </>,
        modalElement,
      )}
    </>
  );
};

export default Modal;
