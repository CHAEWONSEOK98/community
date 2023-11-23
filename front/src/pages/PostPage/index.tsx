import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineMore } from "react-icons/ai";

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
  const [toggle, setToggle] = useState<boolean>(false);
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

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div className="  mx-auto mt-10 max-w-4xl px-4">
      {modal && <Modal setModal={setModal} />}

      {post &&
        post.map((element: Post) => {
          return (
            <div key={element._id}>
              <header className=" flex flex-col gap-2 border-b border-gray-400 pb-4">
                <h1 className="text-2xl font-bold">{element.title}</h1>
                <div className="flex items-center gap-2 text-sm  ">
                  <span className="opacity-70">{element.username}</span>
                  <span className="opacity-40">l</span>
                  <span className="opacity-70">
                    {element.createdAt.slice(0, 10)}{" "}
                    {element.createdAt.slice(11, 16)}
                  </span>
                  <div className="relative">
                    <AiOutlineMore
                      onClick={handleToggle}
                      className="mt-1 h-4 w-4 cursor-pointer rounded-full border border-black"
                    />
                    {toggle && (
                      <div className="absolute  -left-12 top-6 h-20  w-28 rounded-sm border-2  bg-white text-sm">
                        <div className=" mt-3 flex flex-col items-center gap-2">
                          <Link to={`/write/${element._id}`}>
                            <button>수정</button>
                          </Link>
                          <button onClick={handleDelete}>삭제</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </header>

              <main className="mt-2">
                <p>{element.content}</p>
              </main>
            </div>
          );
        })}
    </div>
  );
};

export default PostPage;
