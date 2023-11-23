import PostListLayout from "../../components/Layout/PostListLayout";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyPostListPage = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [myPosts, setMyPosts] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.post(`http://localhost:3000/post/my`, {
        userId: currentUser.data._id,
      });
      setMyPosts(data);
    })();
  }, []);
  console.log(myPosts);
  return (
    <div className="px-4">
      <h1 className="my-4 font-bold">내 게시글</h1>
      <PostListLayout>
        {myPosts.map((post) => (
          <ul
            key={post._id}
            className="h-auto cursor-pointer rounded-md border border-black shadow-lg lg:h-auto"
          >
            <Link to={`${post._id}`}>
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
                      <span className="text-sm">
                        {post.createdAt.slice(0, 10)}
                      </span>
                      <span className="text-sm">댓글 개수</span>
                    </div>
                    <span className="text-sm">좋아요 수</span>
                  </footer>
                </div>
              </li>
            </Link>
          </ul>
        ))}
      </PostListLayout>
    </div>
  );
};

export default MyPostListPage;
