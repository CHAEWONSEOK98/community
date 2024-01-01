interface PostProps {
  author: {
    profilePicture: string;
    username: string;
    _id: string;
  };
  createdAt: string;
  des: string;
  tags: string[];
  title: string;
  thumbnail: string;
  category: string;
  _id: string;
}

const PostCard = ({ post }: PostProps) => {
  let { title, createdAt, des, category, tags, thumbnail } = post;

  return (
    <div className="flex items-center justify-between border-b py-10">
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-bold leading-6">{title}</p>
        <p className=" text-sm opacity-70">{createdAt.slice(0, 10)}</p>
        {des && <p className=" font-semibold">{des}</p>}
        <div className="flex gap-2">
          {category && (
            <p className="inline rounded-full bg-[#F2F2F2] px-3 py-2 text-sm">
              {category}
            </p>
          )}
          {tags &&
            tags.map((tag: string, index: number) => (
              <p
                key={index}
                className="inline rounded-full bg-[#F2F2F2] px-3 py-2 text-sm"
              >
                {tag}
              </p>
            ))}
        </div>
      </div>

      {thumbnail && (
        <div className="hidden min-w-fit pl-10 md:block">
          <img
            src={thumbnail}
            alt="thumbnail"
            className="h-28 w-28 object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default PostCard;
