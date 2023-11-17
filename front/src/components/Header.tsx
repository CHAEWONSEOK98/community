import { BiSearch, BiUser } from "react-icons/bi";
import { BsMoonFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Header = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

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
          <ul>
            <li className="hidden items-center gap-1 text-base md:flex">
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
