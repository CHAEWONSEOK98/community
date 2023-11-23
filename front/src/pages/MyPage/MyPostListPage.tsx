import PostListLayout from "../../components/Layout/PostListLayout";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import PostCard from "../../components/PostCard";

const MyPostListPage = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [myPosts, setMyPosts] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.post(`http://localhost:3000/post/my`, {
        userId: currentUser.data._id,
      });
      setMyPosts(data);
    })();
  }, []);

  return (
    <div className="px-4">
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
