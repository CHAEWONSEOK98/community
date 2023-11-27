import { Link } from "react-router-dom";
import { useAppSelector } from "../store";
import { useLocation } from "react-router-dom";

interface PostProps {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

const PostCard = ({ post }: PostProps) => {
  const { currentUser } = useAppSelector((state) => state.user);
  const location = useLocation();
  const { pathname } = location;

  return (
    <ul
      key={post._id}
      className="h-auto cursor-pointer rounded-md shadow-lg transition-transform hover:scale-105 hover:shadow-2xl lg:h-auto"
    >
      <Link to={`/post-list/${post._id}`}>
        <li>
          <img
            src={`https://source.unsplash.com/random`}
            className="h-36 w-full rounded-md object-cover"
          />
          <div className="flex flex-col gap-2 p-2">
            <h1 className="h-12 font-bold leading-5 tracking-tighter">
              {post.title.slice(0, 80)}
            </h1>
            <p className="h-10 text-sm tracking-tighter">
              {post.content.slice(0, 100)}
            </p>
            <footer className=" flex flex-col">
              {pathname === "/my/post-list" ? (
                <div>
                  <div className="mb-2 space-x-2">
                    <span className="text-xs">
                      {post.createdAt.slice(0, 10)}
                    </span>
                    <span className="text-xs">댓글 개수</span>
                    <span className="text-xs">좋아요 수</span>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-2 space-x-2 border-b pb-4">
                    <span className="text-xs">
                      {post.createdAt.slice(0, 10)}
                    </span>
                    <span className="text-xs">댓글 개수</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={currentUser?.profilePicture}
                      />
                      <span className="text-xs">{currentUser.username}</span>
                    </div>
                    <span className="text-xs">좋아요 수</span>
                  </div>
                </div>
              )}
            </footer>
          </div>
        </li>
      </Link>
    </ul>
  );
};

export default PostCard;
