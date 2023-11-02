import axios from "axios";
import { useState } from "react";

const WritePage = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:3000/post`, {
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

  return (
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
