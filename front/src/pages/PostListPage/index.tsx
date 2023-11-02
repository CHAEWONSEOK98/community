import { useState, useEffect } from "react";
import axios from "axios";
import PostPage from "../PostPage";
import { Link } from "react-router-dom";
import PostCover from "../../components/PostCover";

interface Posts {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

const PostListPage = () => {
  const [posts, setPosts] = useState<Posts>([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`http://localhost:3000/post`);

      setPosts(data.posts);
    })();
  }, []);

  return (
    <div className="grid justify-center gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {posts.map((post: Posts) => {
        return (
          <Link to={`/post-list/${post._id}`} key={post._id}>
            <div className="h-64 w-64 border-2">
              <ul>
                <PostCover post={post} />
              </ul>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PostListPage;
