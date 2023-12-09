import { setAddTag, setDeleteTag } from "../../store/write/writeSlice";
import { useAppSelector, useAppDispatch } from "../../store";

const Tags = () => {
  const { tags } = useAppSelector((state) => state.write);
  const dispatch = useAppDispatch();

  const handleTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let input = event.currentTarget.value;

    if (event.key === "," || event.key === "Enter") {
      event.preventDefault();

      if (input.length === 0) return;
      if (!tags.includes(input)) {
        dispatch(setAddTag(input));
      }

      event.currentTarget.value = "";
    }
  };

  const handleTagDelete = (tag: string) => {
    dispatch(setDeleteTag(tag));
  };

  return (
    <div className=" mt-6  rounded-md  border p-3">
      <div className="flex items-center">
        <p className="font-bold">tag</p>
        <input
          type="text"
          placeholder="쉼표 또는 엔터를 이용하여 테그 등록!"
          className="w-full pl-2 outline-none placeholder:text-sm"
          onKeyDown={handleTagKeyDown}
        />
      </div>
      <div className="flex flex-wrap items-center">
        {tags &&
          tags.map((tag, index) => (
            <p
              key={index}
              className="mr-2 mt-4 inline-block cursor-pointer overflow-hidden break-words rounded-full border border-black bg-white p-1 px-5"
              onClick={() => handleTagDelete(tag)}
            >
              {tag}
            </p>
          ))}
      </div>
    </div>
  );
};

export default Tags;
