import TextareaAutosize from "react-textarea-autosize";
import { useAppDispatch, useAppSelector } from "../../store";
import { setTitle } from "../../store/write/writeSlice";

const Title = ({ editorState }: string) => {
  const { title } = useAppSelector((state) => state.write);
  const dispatch = useAppDispatch();

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let input = event.currentTarget.value;
    dispatch(setTitle(input));
  };

  return editorState === "editor" ? (
    <TextareaAutosize
      required
      value={title}
      onChange={handleTitleChange}
      placeholder="제목을 입력하세요"
      className="h-20 w-full resize-none border-b-2 p-2  py-6 text-xl font-bold outline-none lg:text-4xl"
    />
  ) : (
    <TextareaAutosize
      required
      value={title}
      onChange={handleTitleChange}
      className="mt-6 w-full resize-none  font-bold outline-none"
    />
  );
};

export default Title;
