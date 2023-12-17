import Header from "../components/Account/Header";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { deleteUser } from "../store/user/userThunkFunction";

const AccountUnRegisterPage = () => {
  const [confirm, setConfirm] = useState<boolean>(true);
  const [deleteSuccess, setdeleteSuccess] = useState<boolean>(false);
  const { currentUser, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    setConfirm((prev) => !prev);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      dispatch(deleteUser(currentUser._id));
      setdeleteSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed left-0 top-0 z-10 mx-auto h-full w-full bg-[#FFFFFF] p-4 lg:static lg:max-w-[956px]">
      <Header text="서비스 탈퇴" />

      <footer className="fixed bottom-0 left-0 mt-16 w-full lg:static ">
        <div
          onClick={handleClick}
          className="flex h-20 w-full cursor-pointer border-y  bg-[#F7F7F7] text-[#7A7A7A] "
        >
          <div className="flex items-center gap-3 p-4 text-left">
            <FaCheckCircle
              className={`text-xl ${confirm ? "" : "text-black"}`}
            />
            <p className="text-sm">
              탈퇴 시 회원 정보는 모두 삭제되고 데이터 복구가 불가함에
              동의합니다.
            </p>
          </div>
        </div>
        <form onClick={handleSubmit}>
          <button
            disabled={confirm}
            className="h-14 w-full cursor-pointer bg-[#6111EC] text-base font-bold text-white disabled:cursor-none disabled:bg-[#EEEEEE] disabled:text-[#E0E0E0]"
          >
            Community 탈퇴
          </button>
        </form>
        {error ? (
          <p className="mt-4 text-red-600">{error && "삭제 실패"}</p>
        ) : (
          ""
        )}
        {deleteSuccess ? (
          <p className="mt-4 text-green-600">{deleteSuccess && "삭제 성공"}</p>
        ) : (
          ""
        )}
      </footer>
    </div>
  );
};

export default AccountUnRegisterPage;
