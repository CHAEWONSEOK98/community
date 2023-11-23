import PostListLayout from "../../components/Layout/PostListLayout";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";

const MyPostListPage = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    (async () => {
      const data = await axios.post(`http://localhost:3000/post/my`, {
        userId: currentUser.data._id,
      });
      console.log(data);
    })();
  }, []);
  return (
    <div className="px-4">
      <h1 className="my-4 font-bold">내 게시글</h1>
      <PostListLayout>
        <div className="h-auto cursor-pointer rounded-md border border-black shadow-lg lg:h-auto">
          <img
            src={`https://source.unsplash.com/random`}
            className="h-60 w-full rounded-md object-cover"
          />

          <div className="flex flex-col gap-4 p-4">
            <h1 className="font-bold ">title</h1>
            <p className="text-sm">
              {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              rem distinctio nesciunt commodi nemo dolorem soluta, explicabo
              iusto omnis! Debitis cum sequi itaque a nisi facere velit ex
              nostrum animi.`.slice(0, 150)}
            </p>
            <div className=" flex items-center justify-between">
              <div className="space-x-2">
                <span className="text-sm">날짜</span>
                <span className="text-sm">댓글 개수</span>
              </div>
              <span className="text-sm">좋아요 수</span>
            </div>
          </div>
        </div>
      </PostListLayout>
    </div>
  );
};

export default MyPostListPage;
