import { createPortal } from "react-dom";
import Backdrop from "./Backdrop";
import DeletePostOverlay from "./Overlay/DeletePostOverlay";
import AddCategoryOverlay from "./Overlay/AddCategoryOverlay";
import DeleteCategoryOverlay from "./Overlay/DeleteCategoryOverlay";

const modalElement = document.querySelector("#modal") as HTMLElement;

interface ModalProps {
  setDeletePostModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAddCategoriesModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteCategoriesModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({
  setDeletePostModal,
  setAddCategoriesModal,
  setDeleteCategoriesModal,
}: ModalProps) => {
  return (
    <>
      {createPortal(
        <>
          <Backdrop
            setDeletePostModal={setDeletePostModal}
            setAddCategoriesModal={setAddCategoriesModal}
            setDeleteCategoriesModal={setDeleteCategoriesModal}
          />
          {setDeletePostModal && (
            <DeletePostOverlay setDeletePostModal={setDeletePostModal} />
          )}
          {setAddCategoriesModal && (
            <AddCategoryOverlay setAddCategoriesModal={setAddCategoriesModal} />
          )}
          {setDeleteCategoriesModal && (
            <DeleteCategoryOverlay
              setDeleteCategoriesModal={setDeleteCategoriesModal}
            />
          )}
        </>,
        modalElement,
      )}
    </>
  );
};

export default Modal;
