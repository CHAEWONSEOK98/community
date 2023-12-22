interface BackdropProps {
  setDeletePostModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAddCategoriesModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteCategoriesModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Backdrop = ({
  setDeletePostModal,
  setAddCategoriesModal,
  setDeleteCategoriesModal,
}: BackdropProps) => {
  const handleCancel = () => {
    setDeletePostModal && setDeletePostModal(false);
    setAddCategoriesModal && setAddCategoriesModal(false);
    setDeleteCategoriesModal && setDeleteCategoriesModal(false);
  };

  return (
    <div
      onClick={handleCancel}
      className="fixed left-0 top-0 z-20 h-full w-full bg-black bg-opacity-70"
    />
  );
};

export default Backdrop;
