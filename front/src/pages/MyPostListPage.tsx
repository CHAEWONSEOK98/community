import PostListLayout from "../components/Layout/PostListLayout";
import axios from "axios";
import { useAppSelector } from "../store";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import toast, { Toaster } from "react-hot-toast";
import { TbArrowsDownUp } from "react-icons/tb";

const MyPostListPage = () => {
  const { currentUser } = useAppSelector((state) => state.user);

  const [publicPosts, setPublicPosts] = useState([]);
  const [privatePosts, setPrivatePosts] = useState([]);
  const [publicToggle, setPublicToggle] = useState<boolean>(true);

  const [publicPostsUrl, setPublicPostsUrl] = useState<string>(
    `http://localhost:3000/post/my/post-list/public`,
  );
  const [privatePostsUrl, setPrivatePostsUrl] = useState<string>(
    `http://localhost:3000/post/my/post-list/private`,
  );

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const { data } = await axios.post(`${publicPostsUrl}`, {
          userId: currentUser._id,
        });
        setPublicPosts((prev) => [...prev, ...data]);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error);
      } finally {
        setLoading(false);
      }
    })();
  }, [publicPostsUrl]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const { data } = await axios.post(`${privatePostsUrl}`, {
          userId: currentUser._id,
        });

        setPrivatePosts((prev) => [...prev, ...data]);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error);
      } finally {
        setLoading(false);
      }
    })();
  }, [privatePostsUrl]);

  const handlePublicToggle = () => {
    setPublicToggle((prev) => !prev);
  };

  const handleSeeMore = () => {
    if (!publicPosts.length || loading === true) return;

    if (publicToggle) {
      const lastPublicPostId = publicPosts[publicPosts.length - 1]._id;
      setPublicPostsUrl(
        `http://localhost:3000/post/my/post-list/public?lastId=${lastPublicPostId}`,
      );
    } else {
      const lastPrivatePostId = privatePosts[privatePosts.length - 1];
      setPrivatePostsUrl(
        `http://localhost:3000/post/my/post-list/private?lastId=${lastPrivatePostId}`,
      );
    }
  };

  return (
    <div className="px-4">
      <Toaster />
      <h1 className="my-4 font-bold">내 게시글</h1>

      <div className="flex justify-end">
        <div
          className="mb-2 flex w-20 cursor-pointer items-center  justify-center rounded-full border-2 border-black bg-black text-white"
          onClick={handlePublicToggle}
        >
          <button className="py-1 text-sm">
            {publicToggle ? "비공개" : "공개"}
          </button>
          <TbArrowsDownUp />
        </div>
      </div>

      <PostListLayout>
        {publicToggle
          ? publicPosts.map((post) => <PostCard post={post} key={post._id} />)
          : privatePosts.map((post) => <PostCard post={post} key={post._id} />)}
      </PostListLayout>

      <button
        onClick={handleSeeMore}
        disabled={loading}
        className="mb-2 w-full rounded-md bg-black py-2 font-bold text-white disabled:opacity-25"
      >
        더보기
      </button>
    </div>
  );
};

export default MyPostListPage;
