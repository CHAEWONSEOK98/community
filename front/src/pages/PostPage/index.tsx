import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

const PostPage = () => {
  const [post, setPost] = useState<Post>([]);
  let { postId } = useParams();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`http://localhost:3000/post/${postId}`);
      const postData = Object.values(data);

      setPost(postData);
    })();
  }, []);

  return (
    <div>
      {post &&
        post.map((element: Post) => {
          return (
            <div key={element._id}>
              <h1>{element.title}</h1>
              <p>{element.content}</p>
              <span>{element.createdAt}</span>
            </div>
          );
        })}
    </div>
  );
};

export default PostPage;
