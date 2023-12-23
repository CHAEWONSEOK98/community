import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { setCategory } from "../../store/write/writeSlice";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const Category = () => {
  const { categories } = useAppSelector((state) => state.category);
  const { category } = useAppSelector((state) => state.write);

  const [categoryToggle, setCategoryToggle] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleCategoryToggle = () => {
    setCategoryToggle((prev) => !prev);
  };

  const handleCategoryClick = (event: React.MouseEvent<HTMLLIElement>) => {
    let category = event.currentTarget.innerText;
    if (category === "카테고리 없음") {
      dispatch(setCategory(""));
    } else {
      dispatch(setCategory(category));
    }
    setCategoryToggle(false);
  };

  return (
    <div className="mt-10 w-40 cursor-pointer rounded-md border">
      <div
        className="flex items-center justify-between px-2 py-1"
        onClick={handleCategoryToggle}
      >
        <button>{category.length === 0 ? "카테고리" : category}</button>
        {categoryToggle ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      <ul
        className={`${
          categoryToggle ? "block" : "hidden"
        } absolute z-50 mt-4 w-40 rounded-md border bg-white`}
      >
        <li
          onClick={handleCategoryClick}
          className="px-2 py-1 hover:bg-black hover:bg-opacity-30"
        >
          카테고리 없음
        </li>
        {categories.map((category) => (
          <li
            onClick={handleCategoryClick}
            key={category._id}
            className="px-2 py-1 hover:bg-black hover:bg-opacity-30"
          >
            {category.categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
