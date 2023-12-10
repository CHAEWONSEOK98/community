import { IoIosArrowForward } from "react-icons/io";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { AiOutlineComment } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { CiSaveDown2 } from "react-icons/ci";
import { useAppSelector, useAppDispatch } from "../store";
import { logOutUser } from "../store/user/userThunkFunction";
import { Link } from "react-router-dom";

const UserNavigationPanel = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    try {
      dispatch(logOutUser());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="absolute right-0 top-10 z-50 w-48 rounded-[8px] border bg-white px-4 pt-4 shadow-lg md:w-72">
      <div className="flex flex-col items-center">
        <Link to={`/account/info`}>
          <button className="flex items-center gap-1 rounded-[18px] border p-2 text-xs">
            <p>{currentUser?.username}님</p>
            <IoIosArrowForward />
          </button>
        </Link>

        <ul className="mt-4 flex flex-col gap-4 tracking-tighter md:grid md:grid-cols-2">
          <Link to={`/write`} className="flex items-center gap-2 md:hidden">
            <HiOutlinePencilSquare className="text-xl" />
            <p className="text-sm">게시글 작성</p>
          </Link>
          <Link to={`/my/post-list`} className="flex items-center gap-2">
            <MdOutlineLibraryBooks className="text-xl" />
            <p className="text-sm">게시글 내역</p>
          </Link>
          <li className="flex items-center gap-2">
            <AiOutlineComment className="text-xl" />
            <p className="text-sm">댓글 내역</p>
          </li>
          <Link to={`/my/like-post`}>
            <li className="flex items-center gap-2">
              <AiOutlineLike className="text-xl" />
              <p className="text-sm">좋아요 내역</p>
            </li>
          </Link>
          <Link to={`/my/save`}>
            <li className="flex items-center gap-2">
              <CiSaveDown2 className="text-xl" />
              <p className="text-sm">임시 저장 글</p>
            </li>
          </Link>
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
  );
};

export default UserNavigationPanel;
