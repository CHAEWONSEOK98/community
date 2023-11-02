import { useState, useEffect } from "react";
import axios from "axios";

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
          <div key={post._id} className="h-64 w-64 border-2">
            <ul>
              <span>{post.title}</span>
              <p>{post.content.slice(0, 70)}</p>
              <span>{post.createdAt.slice(0, 10)}</span>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default PostListPage;
