import { useState } from "react";
import {
  deleteCategory,
  getCategories,
} from "../../../store/category/categoryThunkFunction";
import { useAppDispatch, useAppSelector } from "../../../store/index";

interface DeleteCategoryOverlayProps {
  setDeleteCategoriesModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteCategoryOverlay = ({
  setDeleteCategoriesModal,
}: DeleteCategoryOverlayProps) => {
  const { categories } = useAppSelector((state) => state.category);

  const [categoryName, setCategoryName] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleCancel = () => {
    setDeleteCategoriesModal(false);
  };

  const handleCategroyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.currentTarget.value);
  };

  const handleDeleteCategory = () => {
    if (categoryName.length === 0) return;
    const categoryNameCheck = categories.some(
      (category) => category.categoryName === categoryName,
    );
    if (!categoryNameCheck) return;

    dispatch(deleteCategory(categoryName));
    setDeleteCategoriesModal(false);
  };

  return (
    <div className=" fixed left-1/2 top-1/2 z-20 flex w-11/12  -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded bg-white px-6 py-8 md:w-96 ">
      <p className="font-bold tracking-tighter">카테고리 삭제</p>
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
          onClick={handleDeleteCategory}
          className="w-20 rounded-full bg-slate-600 bg-opacity-20 py-[6px] text-xs text-white hover:bg-black"
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default DeleteCategoryOverlay;
