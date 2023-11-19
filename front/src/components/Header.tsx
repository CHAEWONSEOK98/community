import { IoIosArrowForward } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import { BsMoonFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { AiOutlineComment } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useState } from "react";

const Header = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [seeMoreToggle, setSeeMoreToggle] = useState<boolean>(false);

  const handleToggleClick = () => {
    setSeeMoreToggle((prev) => !prev);
  };

  return (
    <header className="-z-10 m-auto flex h-24 max-w-7xl items-center justify-between">
      <div>
        <Link to={`/`}>
          <span className=" font-bold">Community</span>
        </Link>
      </div>

      <ul className="relative flex cursor-pointer items-center space-x-4">
        <li className="text-base">
          <BiSearch />
        </li>
        <li className="text-base">
          <BsMoonFill />
        </li>

        {currentUser ? (
          <ul>
            <li
              onClick={handleToggleClick}
              className=" hidden items-center gap-1 text-base md:flex"
            >
              <img
                src={currentUser.data.profilePicture}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
              />
              <IoIosArrowDown />
            </li>
            <li className="md:hidden">
              <Link to={`/see-more`}>
                <RxHamburgerMenu />
              </Link>
            </li>

            {seeMoreToggle && (
              <nav className="absolute -left-36 top-10  hidden w-72 rounded-[8px]  border px-4 pt-4 shadow-lg md:block">
                <div
                  className="flex flex-col items-center"
                  onClick={handleToggleClick}
                >
                  <Link to={`/account/info`}>
                    <button className="flex items-center gap-1 rounded-[18px] border p-2 text-xs">
                      <span>{currentUser.data.username}님</span>
                      <IoIosArrowForward />
                    </button>
                  </Link>

                  <ul className="mt-4 flex flex-col gap-4">
                    <li className="flex items-center gap-2">
                      <MdOutlineLibraryBooks className="text-xl" />
                      <span className="text-sm">게시글 내역</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <AiOutlineComment className="text-xl" />
                      <span className="text-sm">댓글 내역</span>
                    </li>
                  </ul>

                  <footer className="my-4 w-full">
                    <button className="w-full border-t  border-gray-300 pt-4 text-xs text-[#7A7A7A]">
                      로그아웃
                    </button>
                  </footer>
                </div>
              </nav>
            )}
          </ul>
        ) : (
          <Link to={`/sign-in`}>
            <li className="text-base">로그인</li>
          </Link>
        )}
      </ul>
    </header>
  );
};

export default Header;
