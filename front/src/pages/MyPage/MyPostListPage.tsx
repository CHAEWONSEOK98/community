import PostListLayout from "../../components/Layout/PostListLayout";
import axios from "axios";
import { useAppSelector } from "../../store";
import { useEffect, useState } from "react";
import PostCard from "../../components/PostCard";
import toast, { Toaster } from "react-hot-toast";
import { TbArrowsDownUp } from "react-icons/tb";

const MyPostListPage = () => {
  const { currentUser } = useAppSelector((state) => state.user);

  const [publicPosts, setPublicPosts] = useState([]);
  const [notPublicPosts, setNotPublicPosts] = useState([]);
  const [publicToggle, setPublicToggle] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          `http://localhost:3000/post/my/post-list`,
          {
            userId: currentUser._id,
          },
        );
        let publicPosts = data.filter((post) => post.isPublic === true);
        let notPublicPosts = data.filter((post) => post.isPublic !== true);

        setPublicPosts(publicPosts);
        setNotPublicPosts(notPublicPosts);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error);
      }
    })();
  }, []);

  const handlePublicToggle = () => {
    setPublicToggle((prev) => !prev);
  };

  return (
    <div className="px-4">
      <Toaster />
      <h1 className="my-4 font-bold">
        내 게시글 {publicPosts.length + notPublicPosts.length}
      </h1>
      <div
        className="mb-2 flex w-20 cursor-pointer items-center justify-center rounded-full border-2 border-black bg-black text-white"
        onClick={handlePublicToggle}
      >
        <button className="py-1 text-sm">
          {publicToggle ? "공개" : "비공개"}
        </button>
        <TbArrowsDownUp />
      </div>

      <PostListLayout>
        {publicToggle
          ? publicPosts.map((post) => <PostCard post={post} key={post._id} />)
          : notPublicPosts.map((post) => (
              <PostCard post={post} key={post._id} />
            ))}
      </PostListLayout>
    </div>
  );
};

export default MyPostListPage;
