import { useAppDispatch, useAppSelector } from "../../store";
import { setIsPublic } from "../../store/write/writeSlice";

const IsPublic = () => {
  const { isPublic } = useAppSelector((state) => state.write);
  const dispatch = useAppDispatch();

  const handlePublicClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    let input = event.currentTarget.textContent;

    if (input === "전체 공개") {
      dispatch(setIsPublic(true));
    }

    if (input === "비공개") {
      dispatch(setIsPublic(false));
    }
  };
  return (
    <div className=" mt-4 flex w-full items-center justify-between rounded-md border  p-3 text-sm ">
      <p className=" p-1 font-bold">공개 설정</p>

      <button
        className={`mr-3 cursor-pointer p-1  ${
          isPublic && "border-b-2 border-black font-bold "
        }`}
        onClick={handlePublicClick}
      >
        전체 공개
      </button>
      <button
        className={`mr-3 cursor-pointer p-1  ${
          !isPublic && "border-b-2 border-black font-bold "
        }`}
        onClick={handlePublicClick}
      >
        비공개
      </button>
    </div>
  );
};

export default IsPublic;
