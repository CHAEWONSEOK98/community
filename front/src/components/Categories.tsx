import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Modal from "./Modal/Modal";
import { useAppDispatch, useAppSelector } from "../store";
import { getCategories } from "../store/category/categoryThunkFunction";

const Categories = () => {
  const { categories, trigger } = useAppSelector((state) => state.category);

  const [addCategoriesModal, setAddCategoriesModal] = useState<boolean>(false);
  const [deleteCategoriesModal, setDeleteCategoriesModal] =
    useState<boolean>(false);

  const dispatch = useAppDispatch();
  const location = useLocation();
  const locationSplit = location.pathname.split("/");
  const loactionLastValue = locationSplit[locationSplit.length - 1];

  useEffect(() => {
    console.log(trigger);
    dispatch(getCategories());
  }, [trigger]);

  const handleAddCategory = () => {
    setAddCategoriesModal(true);
  };

  const handleDeleteCategory = () => {
    setDeleteCategoriesModal(true);
  };

  return (
    <div className="order-2 mx-auto  pt-6 md:w-[675px]  lg:sticky lg:top-24 lg:mx-0 lg:ml-auto lg:h-96 lg:w-[22rem]">
      <p className="mb-3 text-sm font-bold">Categories</p>
      <ul className="flex flex-wrap gap-2">
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
        <Link to={`/`} className="relative">
          <li
            className={`inline-flex h-9 cursor-pointer  items-center rounded-3xl border border-solid bg-[#F2F2F2] p-4 text-sm ${
              location.pathname === "/" ? "border-2 border-black" : ""
            }`}
          >
            All
          </li>
        </Link>
        {categories &&
          categories.map((category) => (
            <Link
              to={`/category/${category.categoryName}`}
              key={category._id}
              className="relative"
            >
              <li
                className={`${
                  loactionLastValue === category.categoryName
                    ? "border-2 border-black"
                    : ""
                } inline-flex h-9 cursor-pointer  items-center rounded-3xl border border-solid bg-[#F2F2F2] p-4 text-sm`}
              >
                {category.categoryName}
              </li>
            </Link>
          ))}
      </ul>

      {addCategoriesModal && (
        <Modal setAddCategoriesModal={setAddCategoriesModal} />
      )}
      {deleteCategoriesModal && (
        <Modal setDeleteCategoriesModal={setDeleteCategoriesModal} />
      )}
    </div>
  );
};

export default Categories;
