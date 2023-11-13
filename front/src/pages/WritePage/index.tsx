import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const WritePage = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [updateTitle, setUpdateTitle] = useState<string>("");
  const [updateContent, setUpdateContent] = useState<string>("");
  const { postId } = useParams();
  const navigate = useNavigate();

  // update
  useEffect(() => {
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
    setUpdateTitle(event.target.value);
  };

  const handleUpdateContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setUpdateContent(event.target.value);
  };

  // init
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:3000/post/${postId}`, {
        title,
        content,
      });
    } catch (error) {
      console.log(error);
      throw new Error("Failed to Post");
    } finally {
      setTitle("");
      setContent("");
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setContent(event.target.value);
  };

  return postId ? (
    <div className="flex h-screen w-screen items-center justify-center">
      <form onSubmit={handleUpdate} className="flex flex-col">
        <input
          value={updateTitle}
          onChange={handleUpdateTitleChange}
          type="text"
          placeholder="제목..."
          className="border-2 border-gray-400"
        />
        <textarea
          value={updateContent}
          onChange={handleUpdateContentChange}
          placeholder="내용..."
          name=""
          id=""
          cols="30"
          rows="10"
          className="mt-4 border-2 border-black"
        />
        <button>수정</button>
      </form>
    </div>
  ) : (
    <div className="flex h-screen w-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          value={title}
          onChange={handleTitleChange}
          type="text"
          placeholder="제목..."
          className="border-2 border-gray-400"
        />
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="내용..."
          name=""
          id=""
          cols="30"
          rows="10"
          className="mt-4 border-2 border-black"
        />
        <button>등록</button>
      </form>
    </div>
  );
};

export default WritePage;
