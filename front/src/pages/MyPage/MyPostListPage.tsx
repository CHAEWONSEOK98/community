import PostListLayout from "../../components/Layout/PostListLayout";
import axios from "axios";
import { useAppSelector } from "../../store";
import { useEffect, useState } from "react";
import PostCard from "../../components/PostCard";
import toast, { Toaster } from "react-hot-toast";

const MyPostListPage = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const [myPosts, setMyPosts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          `http://localhost:3000/post/my/post-list`,
          {
            userId: currentUser._id,
          },
        );
        setMyPosts(data);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error);
      }
    })();
  }, []);

  return (
    <div className="px-4">
      <Toaster />
      <h1 className="my-4 font-bold">내 게시글</h1>
      <PostListLayout>
        {myPosts.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </PostListLayout>
    </div>
  );
};

export default MyPostListPage;
