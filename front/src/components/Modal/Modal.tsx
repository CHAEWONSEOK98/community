import { createPortal } from "react-dom";
import Backdrop from "./Backdrop";
import DeletePostOverlay from "./Overlay/DeletePostOverlay";
import AddCategoryOverlay from "./Overlay/AddCategoryOverlay";

const modalElement = document.querySelector("#modal") as HTMLElement;

interface ModalProps {
  setDeletePostModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAddCategoriesModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ setDeletePostModal, setAddCategoriesModal }: ModalProps) => {

  return (
    <>
      {createPortal(
        <>
          <Backdrop setDeletePostModal={setDeletePostModal} setAddCategoriesModal={setAddCategoriesModal} />
          {setDeletePostModal && <DeletePostOverlay setDeletePostModal={setDeletePostModal} />}
          {setAddCategoriesModal && (
            <AddCategoryOverlay setAddCategoriesModal={setAddCategoriesModal} />
          )}
        </>,
        modalElement,
      )}
    </>
  );
};

export default Modal;
