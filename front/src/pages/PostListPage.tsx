import { useState, useEffect } from "react";
import axios from "axios";
import PostListLayout from "../components/Layout/PostListLayout";
import PostCard from "../components/PostCard";

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
    <div className="px-4">
      <h1 className="my-4 font-bold">게시글</h1>

      <PostListLayout>
        {posts.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </PostListLayout>
    </div>
  );
};

export default PostListPage;
