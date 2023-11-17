import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { AiOutlineComment } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Header from "../../components/Account/Header";
import { Link } from "react-router-dom";

const SeeMorePage = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <div className="mx-auto h-screen max-w-md p-4 md:max-w-5xl">
      <Header text="더보기" />

      <Link to={`/account/info`}>
        <main className="my-12 flex cursor-pointer items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={`${currentUser?.data.profilePicture}`}
              alt="profile-image"
              className="h-16 w-16 rounded-full object-cover"
            />
            <span className="text-xl font-bold">{`${currentUser?.data.username}`}</span>
          </div>
          <IoIosArrowForward className="text-xl" />
        </main>
      </Link>

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
