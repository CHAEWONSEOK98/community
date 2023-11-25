import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineMore } from "react-icons/ai";
import { MdOutlineMoreVert } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { TbArrowsDownUp } from "react-icons/tb";

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
  const { currentUser } = useSelector((state: RootState) => state.user);

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
  }, []);

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
          userId: currentUser?.data._id,
          username: currentUser?.data.username,
          profilePicture: currentUser?.data.profilePicture,
        },
        { withCredentials: true },
      );
      console.log(comment);
      setCommentValue("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/post/${postId}/comment`,
        {
          data: {
            commentId: commentId,
          },
        },
      );
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
                      {currentUser?.data._id === element.user && (
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

      <div className="mt-80 space-y-4 overflow-hidden bg-white  pb-10 ">
        <header className="flex items-center border-b-2 border-gray-100 px-1 py-3">
          <IoIosArrowBack className="cursor-pointer text-xl" />
          <h1 className="font-bold">댓글({comments.length})</h1>
        </header>
        <div className="flex items-center justify-end gap-1 pb-2 pr-4 tracking-tighter text-gray-400">
          <TbArrowsDownUp className="text-xs" />
          <span className="text-xs font-bold">좋아요 순</span>
        </div>

        {comments &&
          comments.map((comment) => (
            <div className="relative  pl-4" key={comment._id}>
              <div className="absolute">
                <img
                  src={comment.profilePicture}
                  className="h-12 w-12 rounded-full ring-2 ring-violet-300"
                />
              </div>
              <div className="flex flex-col pl-12">
                <div className="flex flex-col gap-3 px-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-bold">
                      {comment.username}
                    </span>
                    <span className=" text-xs">
                      {`${comment.createdAt}`.slice(0, 10).replace(/-/g, ".")}
                    </span>
                  </div>

                  <main>
                    <p className="mb-3 whitespace-pre-wrap text-sm ">
                      {comment.content}
                    </p>
                  </main>

                  <div className="flex items-center justify-between border-b-2 pb-4">
                    <div className="flex gap-2">
                      <button
                        disabled={currentUser ? false : true}
                        className="h-7 w-[74px] rounded-lg border border-[#E5E7EB] bg-[#EEEEEE] text-xs text-gray-500"
                      >
                        좋아요
                      </button>
                      <button
                        disabled={currentUser ? false : true}
                        className="h-7 w-[74px] rounded-lg border border-[#E5E7EB] bg-[#EEEEEE] text-xs text-gray-500"
                      >
                        대댓글
                      </button>
                    </div>
                    <div>
                      {comment.username === currentUser?.data.username ? (
                        <button
                          onClick={() => handleCommentDelete(comment._id)}
                          disabled={currentUser ? false : true}
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#EEEEEE]"
                        >
                          x
                        </button>
                      ) : (
                        <button
                          disabled={currentUser ? false : true}
                          className=" h-7 w-7 rounded-lg border border-[#E5E7EB] bg-[#EEEEEE]"
                        >
                          <MdOutlineMoreVert className="mx-auto" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {currentUser?.data._id ? (
          <div className="relative">
            <form
              onSubmit={handleCommentSubmit}
              className=" flex  h-16 items-center  bg-white  p-2 md:max-w-4xl"
            >
              <TextareaAutosize
                value={commentValue}
                onChange={handleCommentChange}
                placeholder="댓글을 입력해주세요"
                className="w-full resize-none  rounded-[20px]  border border-solid bg-[#EEEEEE] px-[10px] py-2 pr-10 text-sm outline-none"
              />
              <button className="absolute right-4 cursor-pointer  pr-1 text-xs">
                등록
              </button>
            </form>
          </div>
        ) : null}

        {/* // */}
      </div>
    </div>
  );
};

export default PostPage;
