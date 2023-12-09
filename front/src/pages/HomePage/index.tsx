import { useState, useEffect } from "react";
import axios from "axios";

interface Posts {
  createdAt: string;
  des: string;
  draft: boolean;
  isPublic: boolean;
  likes: [] | string[];
  tags: [] | string[];
  thumbnail: string;
  title: string;
  user: string;
  username: string;
  __v: number;
  _id: string;
}

const HomePage = () => {
  const [posts, setPosts] = useState<Posts>([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`http://localhost:3000/post`);
      setPosts(data.posts);
    })();
  }, []);

  return (
    <div className=" px-4 lg:mt-10 lg:flex lg:px-0 ">
      <div className="order-2 mx-auto  pt-6 md:w-[675px]  lg:sticky lg:top-24 lg:mx-0 lg:ml-auto lg:h-96 lg:w-[22rem]">
        <p className="mb-3 text-sm font-bold">CATEGORY</p>
        <ul className="flex flex-wrap gap-2">
          <li className="inline-flex h-9 cursor-pointer  items-center rounded-3xl border border-solid bg-[#F2F2F2] p-4 text-sm">
            Frontend
          </li>
          <li className="inline-flex h-9 cursor-pointer  items-center rounded-3xl border border-solid bg-[#F2F2F2] p-4 text-sm">
            JavaScript
          </li>
          <li className="inline-flex h-9 cursor-pointer  items-center rounded-3xl border border-solid bg-[#F2F2F2] p-4 text-sm">
            TypeScript
          </li>
          <li className="inline-flex h-9 cursor-pointer  items-center rounded-3xl border border-solid bg-[#F2F2F2] p-4 text-sm">
            React
          </li>
          <li className="inline-flex h-9 cursor-pointer  items-center rounded-3xl border border-solid bg-[#F2F2F2] p-4 text-sm">
            Next.js
          </li>
          <li className="inline-flex h-9 cursor-pointer  items-center rounded-3xl border border-solid bg-[#F2F2F2] p-4 text-sm">
            Redux
          </li>
          <li className="inline-flex h-9 cursor-pointer  items-center rounded-3xl border border-solid bg-[#F2F2F2] p-4 text-sm">
            Recoil
          </li>
          <li className="inline-flex h-9 cursor-pointer  items-center rounded-3xl border border-solid bg-[#F2F2F2] p-4 text-sm">
            React Query
          </li>
        </ul>
      </div>

      <div className="mx-auto md:w-[675px]  lg:mx-0  xl:w-[700px]">
        {posts.map((post) => (
          <div key={post._id} className="mt-8 flex justify-between">
            <div className="flex cursor-pointer  flex-col justify-between md:w-[26rem]">
              <header className="flex items-center gap-1">
                <img
                  src={`https://source.unsplash.com/random`}
                  className="h-6 w-6 rounded-full object-cover"
                />
                <p className="text-sm font-semibold">{post.username}</p>
              </header>
              <main className="mt-2 flex flex-col ">
                <p className=" font-bold leading-5 tracking-tighter">
                  {post.title.slice(0, 50)}
                </p>
                <p className="hidden break-words md:block">
                  {post.des.slice(0, 50)}
                </p>
              </main>
              <footer className="mt-2">
                <p className="text-xs opacity-70">
                  {post.createdAt.slice(0, 10)}
                </p>
              </footer>
            </div>
            <div>
              {post.thumbnail && (
                <img
                  src={post.thumbnail}
                  className="h-24 w-24 object-cover md:h-[134px] md:w-[200px]"
                  alt=""
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
