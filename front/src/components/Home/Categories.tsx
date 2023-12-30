import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { useAppDispatch, useAppSelector } from "../../store";
import { getCategories } from "../../store/category/categoryThunkFunction";

interface CategoriesProps {
  categoryState: string;
  setCategoryState: React.Dispatch<React.SetStateAction<string>>;
  setPosts: React.Dispatch<React.SetStateAction<any[]>>;
  loadMorePosts: () => void;
}

const Categories = ({
  categoryState,
  setCategoryState,
  setPosts,
  loadMorePosts,
}: CategoriesProps) => {
  const { currentUser } = useAppSelector((state) => state.user);
  const { categories, trigger } = useAppSelector((state) => state.category);

  const [addCategoriesModal, setAddCategoriesModal] = useState<boolean>(false);
  const [deleteCategoriesModal, setDeleteCategoriesModal] =
    useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [trigger]);

  const handleAddCategory = () => {
    setAddCategoriesModal(true);
  };

  const handleDeleteCategory = () => {
    setDeleteCategoriesModal(true);
  };

  const handleCategoryClick = (event: React.MouseEvent<HTMLLIElement>) => {
    if (categoryState === event.currentTarget.innerText) return;
    setPosts((prev) => []);

    loadMorePosts(null);

    let category = event.currentTarget.innerText;
    setCategoryState(category);
  };

  return (
    <nav className="  mx-auto  mt-6 overflow-x-auto overflow-y-hidden lg:w-[22rem]">
      <p className="mb-3 hidden  text-sm font-bold lg:block">Categories</p>
      <ul className="flex gap-2  lg:flex-wrap">
        {currentUser && (
          <>
            <li
              onClick={handleAddCategory}
              className="inline-flex h-9 cursor-pointer  items-center  rounded-3xl border border-solid bg-[#F2F2F2] p-4 text-sm font-bold"
            >
              +
            </li>
            <li
              onClick={handleDeleteCategory}
              className="inline-flex h-9 cursor-pointer  items-center  rounded-3xl border border-solid bg-[#F2F2F2] p-4 text-sm font-bold"
            >
              -
            </li>
          </>
        )}

        <li
          onClick={handleCategoryClick}
          className={`inline-flex  h-9 cursor-pointer  items-center rounded-3xl border border-solid bg-[#F2F2F2] p-4 text-sm ${
            categoryState === "All" ? "border-none bg-black text-white" : ""
          }`}
        >
          All
        </li>

        {categories &&
          categories.map((category) => (
            <li
              key={category._id}
              onClick={handleCategoryClick}
              className={`${
                category.categoryName === categoryState
                  ? "border-none bg-black text-white"
                  : ""
              } inline-flex h-9 min-w-max cursor-pointer items-center rounded-3xl border bg-[#F2F2F2] p-4 text-sm`}
            >
              {category.categoryName}
            </li>
          ))}
      </ul>

      {addCategoriesModal && (
        <Modal setAddCategoriesModal={setAddCategoriesModal} />
      )}
      {deleteCategoriesModal && (
        <Modal setDeleteCategoriesModal={setDeleteCategoriesModal} />
      )}
    </nav>
  );
};

export default Categories;
