import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { setTagState } from "../../store/tag/tagSlice";
import { getTags } from "../../store/tag/tagThunkFunction";

const Tags = () => {
  const { tagState, tags } = useAppSelector((state) => state.tag);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTags());
  }, []);

  const handleTagClick = (tag: string) => {
    if (tagState === tag) return;
    dispatch(setTagState(tag));
  };

  const handleTagTitleClick = () => {
    dispatch(setTagState(""));
  };

  return (
    <div className="mt-10 hidden w-[22rem] lg:block">
      <Link
        to={`/tags`}
        className="mb-3 block text-sm font-bold"
        onClick={handleTagTitleClick}
      >
        Tags {tags && `(${tags.length})`}
      </Link>
      <ul className="flex flex-wrap gap-5">
        {tags &&
          tags.map((tag, index) => (
            <Link
              to={`/tags`}
              key={index}
              className={`cursor-pointer text-sm tracking-tighter text-[#6B6B6B] `}
              onClick={() => handleTagClick(tag[0])}
            >
              {tag[0]} {tag[1] > 0 && `(${tag[1] + 1})`}
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default Tags;
