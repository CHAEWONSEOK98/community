import axios from "axios";
import PostListLayout from "../components/Layout/PostListLayout";
import PostCard from "../components/PostCard";
import { useAppSelector } from "../store";
import { useEffect, useState } from "react";

const MyLikePostListPage = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const [likePosts, setLikePosts] = useState();

  useEffect(() => {
    (async () => {
      const { data } = await axios.post(
        `http://localhost:3000/post/my/liked-posts`,
        { likes: currentUser?.likes },
      );
      setLikePosts(data);
    })();
  }, []);
  return (
    <div className="px-4">
      <h1 className="my-4 font-bold">내가 좋아한 게시글</h1>
      <PostListLayout>
        {likePosts?.map((post) => <PostCard post={post} key={post._id} />)}
      </PostListLayout>
    </div>
  );
};

export default MyLikePostListPage;
