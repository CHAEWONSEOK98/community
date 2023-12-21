import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal/Modal";

const Categories = () => {
  const [addCategoriesModal, setAddCategoriesModal] = useState<boolean>(false);

  const handleAddCategory = () => {
    setAddCategoriesModal(true);
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
        <li className="inline-flex h-9 cursor-pointer  items-center rounded-3xl border border-solid bg-[#F2F2F2] p-4 text-sm">
          All
        </li>
        <Link to={`/category/react`}>
          <li className="inline-flex h-9 cursor-pointer  items-center rounded-3xl border border-solid bg-[#F2F2F2] p-4 text-sm">
            React
          </li>
        </Link>
      </ul>

      {addCategoriesModal && <Modal setAddCategoriesModal={setAddCategoriesModal} />}
    </div>
  );
};

export default Categories;

{
  /* <li className="inline-flex h-9 cursor-pointer  items-center rounded-3xl border border-solid bg-[#F2F2F2] p-4 text-sm">
All
</li>
<li className="inline-flex h-9 cursor-pointer  items-center rounded-3xl border border-solid bg-[#F2F2F2] p-4 text-sm">
Frontend
</li>
<li className="inline-flex h-9 cursor-pointer  items-center rounded-3xl border border-solid bg-[#F2F2F2] p-4 text-sm">
JavaScript
</li>
<li className="inline-flex h-9 cursor-pointer  items-center rounded-3xl border border-solid bg-[#F2F2F2] p-4 text-sm">
TypeScript
</li>
<li className="inline-flex h-9 cursor-pointer  items-center rounded-3xl border border-solid bg-[#F2F2F2] p-4 text-sm">
React
</li>
<li className="inline-flex h-9 cursor-pointer  items-center rounded-3xl border border-solid bg-[#F2F2F2] p-4 text-sm">
Next.js
</li>
<li className="inline-flex h-9 cursor-pointer  items-center rounded-3xl border border-solid bg-[#F2F2F2] p-4 text-sm">
Redux
</li>
<li className="inline-flex h-9 cursor-pointer  items-center rounded-3xl border border-solid bg-[#F2F2F2] p-4 text-sm">
Recoil
</li>
<li className="inline-flex h-9 cursor-pointer  items-center rounded-3xl border border-solid bg-[#F2F2F2] p-4 text-sm">
React Query
</li> */
}
