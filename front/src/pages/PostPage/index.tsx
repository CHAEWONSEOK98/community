import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Modal from "../../components/Modal";

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

const PostPage = () => {
  const [post, setPost] = useState<Post>([]);
  const [modal, setModal] = useState<boolean>(false);
  let { postId } = useParams();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`http://localhost:3000/post/${postId}`);
      const postData = Object.values(data);

      setPost(postData);
    })();
  }, []);

  const handleDelete = () => {
    setModal(true);
  };

  return (
    <div className="flex h-screen items-center justify-center ">
      {modal && <Modal setModal={setModal} />}
      <div className="border-4 p-4">
        {post &&
          post.map((element: Post) => {
            return (
              <div key={element._id}>
                <div className="max-w-5xl border-2 p-10">
                  <h1>{element.title}</h1>
                  <p>{element.content}</p>
                  <span>{element.createdAt.slice(0, 10)}</span>
                </div>
                <div>
                  <button onClick={handleDelete}>삭제</button>
                  <Link to={`/write/${element._id}`}>수정</Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PostPage;
