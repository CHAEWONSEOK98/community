import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Categories from "../components/Home/Categories";
import Tags from "../components/Home/Tags";

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
  const [postsUrl, setPostsUrl] = useState(
    `http://localhost:3000/post/category`,
  );
  const targetRef = useRef<HTMLAnchorElement>(null);

  const [categoryState, setCategoryState] = useState<string>("All");

  let lastPostId = posts.length > 0 ? posts[posts.length - 1]._id : null;

  const loadMorePosts = (nullLastPostId?: null | string) => {
    if (nullLastPostId === null) {
      setPostsUrl(`http://localhost:3000/post/category`);
    } else {
      setPostsUrl(`http://localhost:3000/post/category?lastId=${lastPostId}`);
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.post(`${postsUrl}`, { categoryState });
      setPosts((prev) => [...prev, ...data.posts]);
    })();
  }, [postsUrl, categoryState]);

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axios.post(`${postsUrl}`);
  //     setPosts((prev) => [...prev, ...data.posts]);
  //   })();
  // }, [postsUrl]);

  useEffect(() => {
    if (!targetRef.current) return;

    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) loadMorePosts();
      });
    });
    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [loadMorePosts]);

  return (
    <div className=" mb-4  px-4  lg:flex lg:justify-between xl:px-0">
      <div className="order-2 h-full lg:sticky lg:top-16">
        <div className="lg:pl-4">
          <Categories
            categoryState={categoryState}
            setCategoryState={setCategoryState}
            setPosts={setPosts}
            loadMorePosts={loadMorePosts}
          />
          <Tags />
        </div>
      </div>

      <div className="w-4/6 lg:mt-8 lg:border-r ">
        <header className="hidden    lg:sticky lg:top-4 lg:block">
          <button className="border-b-2 border-black pb-2 text-2xl font-bold">
            {categoryState}
          </button>
        </header>

        <div className="mx-auto md:w-[675px]  lg:mx-0  xl:w-[700px]">
          {posts.map((post, index) => (
            <Link
              key={post._id}
              to={`/post-list/${post._id}`}
              ref={index + 2 === posts.length ? targetRef : null}
            >
              <div className="mt-8 flex justify-between">
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
