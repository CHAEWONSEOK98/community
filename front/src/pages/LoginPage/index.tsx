import { RiKakaoTalkFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  return (
    <div className="flex h-screen w-full justify-evenly">
      <button className="text-5xl">
        <RiKakaoTalkFill />
      </button>
      <button className="text-5xl">
        <FcGoogle />
      </button>
    </div>
  );
};

export default LoginPage;
