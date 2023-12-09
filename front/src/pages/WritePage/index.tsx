import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../store";
import { Link, useParams } from "react-router-dom";

import Editor from "../../components/Write/Editor";
import PublishForm from "../../components/Write/PublishForm";

const WritePage = () => {
  const { editorState } = useAppSelector((state) => state.write);

  const [updateTitle, setUpdateTitle] = useState<string>("");
  const [updateContent, setUpdateContent] = useState<string>("");

  const { postId } = useParams();

  // update
  useEffect(() => {
    if (!postId) return;
    (async () => {
      const { data } = await axios.get(`http://localhost:3000/post/${postId}`);

      setUpdateTitle(data.post.title);
      setUpdateContent(data.post.content);
    })();
  }, []);

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3000/post/${postId}`, {
        updateTitle,
        updateContent,
      });
      navigate("/post-list");
    } catch (error) {
      console.log(error);
      throw new Error("Failed to change");
    }
  };

  const handleUpdateTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setUpdateTitle(event.currentTarget.value);
  };

  const handleUpdateContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setUpdateContent(event.currentTarget.value);
  };

  return postId ? (
    <div className="mt-2">
      <form onSubmit={handleUpdate} className="flex flex-col ">
        <input
          required
          value={updateTitle}
          onChange={handleUpdateTitleChange}
          type="text"
          placeholder="제목을 입력하세요"
          className="mx-2 border-b-2 p-2 text-2xl outline-none"
        />
        <textarea
          required
          value={updateContent}
          onChange={handleUpdateContentChange}
          placeholder="내용을 입력하세요"
          className=" mx-2  mb-10 h-[60vh] resize-none  p-2 outline-none"
        />

        <footer className="fixed bottom-0 box-border h-16 w-full border-t-[2px] bg-[#F5F5F5] shadow-lg md:hidden md:max-w-7xl">
          <Link to={`/`}>
            <button className="absolute left-2 top-1/2  h-10 w-20 -translate-y-1/2 rounded-3xl border border-solid border-black text-sm">
              뒤로
            </button>
          </Link>
          <button className="absolute right-2  top-1/2 h-10 w-20 -translate-y-1/2 rounded-3xl  bg-black text-sm">
            <span className=" text-white">수정</span>
          </button>
        </footer>

        <footer className="mt-4 hidden justify-end gap-4 md:flex">
          <Link to={`/`}>
            <button className="  h-10 w-20  rounded-3xl border border-solid border-black text-sm">
              뒤로
            </button>
          </Link>
          <button className=" h-10 w-20  rounded-3xl  bg-black text-sm">
            <span className=" text-white">수정</span>
          </button>
        </footer>
      </form>
    </div>
  ) : editorState === "editor" ? (
    <Editor />
  ) : (
    <PublishForm />
  );
};

export default WritePage;
