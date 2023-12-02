import { BiSearch } from "react-icons/bi";
import { BsMoonFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

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
    <header className="flex h-24 items-center justify-between px-4">
      <div>
        <Link to={`/`}>
          <span className=" font-bold">Community</span>
        </Link>
      </div>

      <ul className="relative flex cursor-pointer items-center gap-3">
        <li className="text-base">
          <BiSearch />
        </li>
        <li className="text-base">
          <BsMoonFill />
        </li>

        {currentUser ? (
          <ul className="flex items-center gap-3">
            <Link
              to={`/write`}
              className="hidden rounded-md border border-black p-1 font-bold md:flex"
            >
              게시글 작성
            </Link>
            <div
              onClick={handleToggleClick}
              onBlur={handleBlur}
              className="flex items-center gap-1  text-base"
              tabIndex={0}
            >
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
              />
              <IoIosArrowDown />
              {userNavigationToggle ? <UserNavigationPanel /> : ""}
            </div>
          </ul>
        ) : (
          <Link to={`/login`}>
            <li className="text-base">로그인</li>
          </Link>
        )}
      </ul>
    </header>
  );
};

export default Header;
