import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineMore } from "react-icons/ai";

import Modal from "../../components/Modal";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import TextareaAutosize from "react-textarea-autosize";

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

const PostPage = () => {
  const [post, setPost] = useState<Post>([]);
  const [commentValue, setCommentValue] = useState<string>("");
  const [comments, setComments] = useState<string[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  let { postId } = useParams();
  const {
    currentUser: {
      data: { _id },
    },
  } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`http://localhost:3000/post/${postId}`);
      const postData = Object.values(data);

      setPost(postData);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `http://localhost:3000/post/${postId}/comment`,
      );
      setComments(data);
    })();
  });

  const handleDelete = () => {
    setModal(true);
  };

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCommentValue(event.currentTarget.value);
  };

  const handleCommentSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    try {
      const comment = await axios.post(
        `http://localhost:3000/post/${postId}/comment`,
        {
          content: commentValue,
          userId: _id,
        },
        { withCredentials: true },
      );
      console.log(comment);
      setCommentValue("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto mt-10  flex  max-w-4xl flex-col  justify-between  px-4">
      <div>
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
                      {_id === element.user && (
                        <AiOutlineMore
                          onClick={handleToggle}
                          className="mt-1 h-4 w-4 cursor-pointer rounded-full border border-black"
                        />
                      )}
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
      <div className="space-y-4">
        {comments.map((comment) => (
          <div>
            <span>{comment.content}</span>
          </div>
        ))}
      </div>

      <div className="relative">
        <form
          onSubmit={handleCommentSubmit}
          className="fixed bottom-0 left-1/2 flex  w-full -translate-x-1/2 items-center bg-white p-2"
        >
          <TextareaAutosize
            value={commentValue}
            onChange={handleCommentChange}
            placeholder="댓글을 입력해주세요"
            className="w-full resize-none rounded-[20px]  border border-solid bg-[#EEEEEE] px-[10px] py-2 pr-10 text-sm outline-none"
          />
          <button className="absolute right-4 cursor-pointer p-2 text-xs">
            등록
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostPage;
