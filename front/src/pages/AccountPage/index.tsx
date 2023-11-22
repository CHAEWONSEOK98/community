import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Header from "../../components/Account/Header";
import { Link } from "react-router-dom";

const AccountPage = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <div className="fixed left-0 top-0 z-10 mx-auto h-full w-full bg-[#FFFFFF] p-4 lg:static lg:max-w-[956px]">
      <header>
        <Header text="계정 정보" />
      </header>

      <Link to={`/account/profile`}>
        <div className="my-12 flex justify-center">
          <img
            src={`${currentUser?.data.profilePicture}`}
            alt="profile-image"
            className="h-24 w-24 rounded-full"
          />
        </div>
      </Link>

      <nav>
        <ul className="flex flex-col ">
          <Link to={`/account/profile`}>
            <li className="flex cursor-pointer items-center justify-between border-b-[1px] border-black border-opacity-50 py-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500">닉네임</span>
                <span className="text-sm font-semibold">
                  {currentUser?.data.username}
                </span>
              </div>
              <IoIosArrowForward />
            </li>
          </Link>
          <li className="flex items-center justify-between border-b-[1px] border-black border-opacity-50 py-6">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-500">계정</span>
              <span className="text-sm font-semibold">
                {currentUser?.data.email}
              </span>
            </div>
          </li>
          <Link to={`/account/unregister`}>
            <li className="flex cursor-pointer items-center justify-between border-b-[1px] border-black border-opacity-50 py-6">
              <span className="text-sm font-semibold">서비스 탈퇴</span>
              <IoIosArrowForward />
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default AccountPage;
