import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Header = ({ text }: string) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };
  return (
    <header className="flex items-center gap-1">
      <IoIosArrowBack
        className="cursor-pointer text-2xl lg:hidden"
        onClick={handleClick}
      />

      <span className="text-sm font-bold lg:mx-0 lg:text-xl">{text}</span>
    </header>
  );
};

export default Header;
