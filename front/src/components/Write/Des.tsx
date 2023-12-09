import { useAppSelector, useAppDispatch } from "../../store";
import { setDes } from "../../store/write/writeSlice";
import TextareaAutosize from "react-textarea-autosize";

const Des = () => {
  const { des } = useAppSelector((state) => state.write);
  const dispatch = useAppDispatch();

  const handleDesKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === "Enter") event.preventDefault();
  };

  const handleDesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let input = event.currentTarget.value;
    dispatch(setDes(input));
  };

  return (
    <div>
      <TextareaAutosize
        minRows={3}
        maxLength={200}
        value={des}
        placeholder="간단한 소개를 입력해주세요"
        onKeyDown={handleDesKeyDown}
        onChange={handleDesChange}
        className=" mt-2 w-full resize-none rounded-md border p-2   placeholder:text-sm placeholder:text-black focus:bg-transparent"
      />
      <p className="flex justify-end text-xs md:text-sm">{des.length}/200</p>
    </div>
  );
};

export default Des;
