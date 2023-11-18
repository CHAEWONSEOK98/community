import { HiPlusCircle } from "react-icons/hi";
import { MdCancel } from "react-icons/md";
import { useSelector } from "react-redux";
import Header from "../../components/Account/Header";
import { RootState } from "../../store";
import { useState } from "react";

const AccountProfilePage = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [name, setName] = useState<string | undefined>(
    currentUser.data.username,
  );

  const handleCancelClick = () => {
    setName("");
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 16) return;
    setName(event.target.value);
  };

  const handleSubmit = (evnet: React.FormEvent<HTMLFormElement>) => {
    evnet.preventDefault();
  };

  return (
    <div className="fixed left-0 top-0 z-10 mx-auto h-full w-full bg-[#FFFFFF] p-4 lg:static lg:max-w-[956px]">
      <Header text="프로필 수정" />

      <div className=" my-12 flex justify-center">
        <div className="relative">
          <img
            src={`${currentUser?.data.profilePicture}`}
            alt="profile-image"
            className=" rounded-full"
          />
          <HiPlusCircle className="absolute -right-2 top-16 text-4xl" />
        </div>
      </div>

      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between text-xs">
          <span className=" font-semibold">닉네임을 입력해주세요.</span>
          <span>
            {`${name.length}`}
            <span className="text-gray-400">/16</span>
          </span>
        </div>

        <div className="relative">
          <input
            type="text"
            value={name}
            className=" w-full rounded-[3px] border-[1px] border-solid p-3  outline-none"
            onChange={handleNameChange}
            autoFocus
          />
          <span
            onClick={handleCancelClick}
            className="absolute right-3 top-[18px] cursor-pointer"
          >
            <MdCancel />
          </span>
        </div>

        <button
          disabled={currentUser.data.username === name ? true : false}
          className="cursor-pointer rounded-[2px] bg-[#6111EC] py-4 text-white  opacity-40 disabled:cursor-default disabled:bg-slate-500"
        >
          저장
        </button>
      </form>
    </div>
  );
};

export default AccountProfilePage;
