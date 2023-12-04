import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

interface PostProps {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

const PostCard = ({ post }) => {
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
          <div className="flex flex-col  p-2">
            <h1 className="h-12 break-words font-bold leading-5 tracking-tighter">
              {post.title.slice(0, 60)}
            </h1>
            <p className="mb-1 text-sm tracking-tighter">
              {`Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus necessitatibus asperiores unde nesciunt hic enim. Quis
              ducimus ad voluptate ea illo. Suscipit sapiente consequuntur quam
              natus quibusdam blanditiis mollitia doloremque!`.slice(0, 100)}
            </p>
            <footer className=" flex flex-col">
              {pathname === "/my/post-list" ? (
                <div>
                  <div className="space-x-2">
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
                        src={`https://source.unsplash.com/random`}
                      />
                      <span className="text-xs">{post.username}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaHeart className="text-sm" />
                      <span className="pb-[2px] text-sm">
                        {post.likes.length}
                      </span>
                    </div>
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
