import { IoIosArrowForward } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import { BsMoonFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { BsClipboard } from "react-icons/bs";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { AiOutlineComment } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import { logOutUser } from "../store/user/userThunkFunction";
import { useAppDispatch, useAppSelector } from "../store";

const Header = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const [seeMoreToggle, setSeeMoreToggle] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleToggleClick = () => {
    setSeeMoreToggle((prev) => !prev);
  };

  const handleLogOut = async () => {
    try {
      dispatch(logOutUser());
    } catch (error) {
      console.log(error);
    }
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
            <li
              onClick={handleToggleClick}
              className="flex items-center gap-1 text-base"
            >
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
              />
              <IoIosArrowDown />
            </li>

            {seeMoreToggle && (
              <nav className="absolute right-1 top-10 z-50 w-48 rounded-[8px] border bg-white px-4 pt-4 shadow-lg md:w-72">
                <div
                  className="flex flex-col items-center"
                  onClick={handleToggleClick}
                >
                  <Link to={`/account/info`}>
                    <button className="flex items-center gap-1 rounded-[18px] border p-2 text-xs">
                      <span>{currentUser?.username}님</span>
                      <IoIosArrowForward />
                    </button>
                  </Link>

                  <ul className="mt-4 flex flex-col gap-4">
                    <Link
                      to={`/write`}
                      className="flex items-center gap-2 md:hidden"
                    >
                      <BsClipboard className="text-xl" />
                      <span className="text-sm">게시글 작성</span>
                    </Link>
                    <Link
                      to={`/my/post-list`}
                      className="flex items-center gap-2"
                    >
                      <MdOutlineLibraryBooks className="text-xl" />
                      <span className="text-sm">게시글 내역</span>
                    </Link>
                    <li className="flex items-center gap-2">
                      <AiOutlineComment className="text-xl" />
                      <span className="text-sm">댓글 내역</span>
                    </li>
                  </ul>

                  <footer className="my-4 w-full">
                    <button
                      onClick={handleLogOut}
                      className="w-full border-t  border-gray-300 pt-4 text-xs text-[#7A7A7A]"
                    >
                      로그아웃
                    </button>
                  </footer>
                </div>
              </nav>
            )}
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
