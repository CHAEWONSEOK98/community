import { BiSearch } from "react-icons/bi";
import { BsMoonFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlinePencilSquare } from "react-icons/hi2";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "../store";
import UserNavigationPanel from "./UserNavigationPanel";

const Header = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const [userNavigationToggle, setUserNavigationToggle] =
    useState<boolean>(false);

  const handleToggleClick = () => {
    setUserNavigationToggle((prev) => !prev);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setUserNavigationToggle(false);
    }, 100);
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b-[1px] border-black bg-white px-4 lg:px-0">
      <div className="flex w-full items-center">
        <Link to={`/`} className="pb-1">
          <p className=" text-xl font-bold">Community</p>
        </Link>
        <form className="relative ml-auto mr-11 items-center pr-2 md:ml-0 md:flex">
          <input
            placeholder="Search"
            className="ml-2 hidden rounded-3xl  bg-[#F9F9F9] py-3 pl-11 pr-6 text-sm outline-none md:block"
          />
          <BiSearch className="absolute left-5 top-1/2 -translate-y-1/2 cursor-pointer text-2xl opacity-70" />
        </form>
      </div>

      <div className="relative flex cursor-pointer items-center gap-3">
        {currentUser ? (
          <div className="flex items-center gap-3">
            <Link to={`/write`} className="relative hidden md:block">
              <p className="rounded-md pl-8 opacity-70 md:flex">Write</p>
              <HiOutlinePencilSquare className="absolute left-0 top-1/2 h-8 w-8 -translate-y-1/2 opacity-50" />
            </Link>
            <div
              onClick={handleToggleClick}
              onBlur={handleBlur}
              className="flex items-center gap-1  text-base"
            >
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
              />
              <IoIosArrowDown className="w-5 md:w-8" />
              {userNavigationToggle ? <UserNavigationPanel /> : ""}
            </div>
          </div>
        ) : (
          <Link to={`/login`}>
            <p className=" text-base">로그인</p>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
