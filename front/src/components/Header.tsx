import { BiSearch, BiUser } from "react-icons/bi";
import { BsMoonFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Header = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  console.log(currentUser);
  return (
    <header className="m-auto flex h-24 max-w-7xl items-center justify-between">
      <div>
        <Link to={`/`}>
          <span className=" font-bold">Community</span>
        </Link>
      </div>

      <ul className="flex cursor-pointer items-center space-x-4">
        <li className="text-base">
          <BiSearch />
        </li>
        <li className="text-base">
          <BsMoonFill />
        </li>

        {currentUser ? (
          <Link to={`/profile`}>
            <li className="flex items-center gap-1 text-base">
              <img
                src={currentUser.data.profilePicture}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
              />
              <IoIosArrowDown />
            </li>
          </Link>
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
