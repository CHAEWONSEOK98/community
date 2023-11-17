import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { AiOutlineComment } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Link } from "react-router-dom";

const SeeMorePage = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <div className="mx-auto h-screen max-w-3xl  p-4">
      <header className="flex items-center gap-2">
        <Link to={`/`}>
          <IoIosArrowBack className="cursor-pointer text-2xl" />
        </Link>

        <span className="font-bold">더보기</span>
      </header>

      <main className="my-12 flex cursor-pointer items-center justify-between">
        <div className="flex items-center space-x-5">
          <img
            src={`${currentUser?.data.profilePicture}`}
            alt="profile-image"
            className="h-16 w-16 rounded-full object-cover"
          />
          <span className="text-xl font-bold">{`${currentUser?.data.username}`}</span>
        </div>
        <IoIosArrowForward className="text-xl" />
      </main>

      <nav>
        <ul className="flex cursor-pointer flex-col gap-8">
          <li className="flex items-center gap-4">
            <MdOutlineLibraryBooks className="text-3xl" />
            <span className="text-sm font-semibold">게시글 내역</span>
          </li>
          <li className="flex items-center gap-4">
            <AiOutlineComment className="text-3xl" />
            <span className="text-sm font-semibold">댓글 내역</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SeeMorePage;
