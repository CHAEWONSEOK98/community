import { useState } from "react";
import { postCategory } from "../../../store/category/categoryThunkFunction";
import { useAppDispatch } from "../../../store/index";

interface AddCategoryOverlayProps {
  setAddCategoriesModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddCategoryOverlay = ({
  setAddCategoriesModal,
}: AddCategoryOverlayProps) => {
  const [categoryName, setCategoryName] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleCancel = () => {
    setAddCategoriesModal(false);
  };

  const handleCategroyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.currentTarget.value);
  };

  const handleAddCategory = () => {
    if (categoryName.length === 0) return;
    dispatch(postCategory(categoryName));
    setAddCategoriesModal(false);
  };

  return (
    <div className=" fixed left-1/2 top-1/2 z-20 flex w-11/12  -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded bg-white px-6 py-8 md:w-96 ">
      <p className="font-bold tracking-tighter">카테고리 추가</p>
      <input
        value={categoryName}
        onChange={handleCategroyChange}
        type="text"
        className="rounded-md border-2 p-2  outline-none"
        placeholder="카테고리 이름"
      />
      <div className="mt-4 flex justify-end gap-3">
        <button
          onClick={handleCancel}
          className="w-20 rounded-full border border-black py-[6px] text-xs"
        >
          취소
        </button>
        <button
          onClick={handleAddCategory}
          className="w-20 rounded-full bg-slate-600 bg-opacity-20 py-[6px] text-xs text-white hover:bg-black"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default AddCategoryOverlay;
