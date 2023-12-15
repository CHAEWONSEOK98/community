import axios from "axios";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

interface Posts {
  content: any[];
  createdAt: string;
  des: string;
  draft?: boolean;
  isPublic?: boolean;
  likes?: [] | string[];
  tags?: [] | string[];
  thumbnail?: string;
  title: string;
  user?: string;
  username?: string;
  __v?: number;
  _id?: string;
}

const MySavePostPage = () => {
  const [posts, setPosts] = useState<Posts[]>([]);

  useEffect(() => {
    (async () => {
      let { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_DOMAIN}/post/my/save-post`,
      );

      setPosts(data.posts);
    })();
  }, []);

  // useEffect(() => {
  //   if (!editor.isReady) {
  //     setEditor(
  //       new EditorJS({
  //         holder: "editor",
  //         data: Array.isArray(content) ? content[0] : content,
  //         tools: tools,
  //         placeholder: "내용을 입력하세요",
  //       }),
  //     );
  //   }
  // }, []);

  const handleDelete = async (
    postId: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_DOMAIN}/post/my/save-post`,
        {
          data: {
            postId,
          },
        },
      );
      const newPosts = posts.filter((post) => post._id !== postId);
      setPosts(newPosts);
      toast.success("삭제 완료");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="mt-4 px-4">
      <Toaster />
      <p className="mb-10 text-3xl font-bold">임시 저장 글</p>

      <div>
        {posts &&
          posts.map((post) => (
            <Link to={`/write/${post._id}`} key={post._id}>
              <div className=" flex cursor-pointer flex-col gap-3 border-b border-b-black border-opacity-30 py-4 pb-2">
                <p className="text-xl font-semibold">{post.title}</p>

                {post.content[0].blocks.map((block) => {
                  if (block.type == "paragraph") {
                    return (
                      <p key={block.id}>{block.data.text.slice(0, 500)}</p>
                    );
                  }
                })}

                <div className="flex justify-between">
                  <p className="text-sm">{post.createdAt.slice(0, 10)}</p>
                  <button
                    className="cursor-pointer hover:line-through"
                    onClick={(event) => handleDelete(post._id, event)}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default MySavePostPage;
