import { Link } from "react-router-dom";

interface PostProps {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

const PostCard = ({ post }: PostProps) => {
  return (
    <ul
      key={post._id}
      className="h-auto cursor-pointer rounded-md shadow-lg transition-transform hover:scale-105 hover:shadow-2xl lg:h-auto"
    >
      <Link to={`/post-list/${post._id}`}>
        <li>
          <img
            src={`https://source.unsplash.com/random`}
            className="h-48 w-full rounded-md object-cover"
          />

          <div className="flex flex-col gap-2 p-2">
            <h1 className="font-bold">{post.title}</h1>
            <p className="h-20 text-sm">{post.content.slice(0, 100)}</p>
            <footer className=" flex items-center justify-between">
              <div className="space-x-2">
                <span className="text-sm">{post.createdAt.slice(0, 10)}</span>
                <span className="text-sm">댓글 개수</span>
              </div>
              <span className="text-sm">좋아요 수</span>
            </footer>
          </div>
        </li>
      </Link>
    </ul>
  );
};

export default PostCard;
