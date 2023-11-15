import { BiSearch, BiUser } from "react-icons/bi";
import { BsMoonFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

const Header = () => {
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
        <li className="flex text-base">
          <BiUser />
          <IoIosArrowDown />
        </li>

        <Link to={`/login`}>
          <li className="text-base">로그인</li>
        </Link>
      </ul>
    </header>
  );
};

export default Header;
