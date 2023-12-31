import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Categories from "../components/Home/Categories";
import Tags from "../components/Home/Tags";
import PostCard from "../components/PostCard";

interface Posts {
  author: {
    profilePicture: string;
    username: string;
    _id: string;
  };
  createdAt: string;
  des: string;
  tags: string[];
  title: string;
  thumbnail: string;
  category: string;
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

      <div className="lg:mt-8 lg:border-r lg:pr-14 ">
        <header className="hidden    lg:sticky lg:top-4 lg:block">
          <button className="border-b-2 border-black pb-2 text-2xl font-bold">
            {categoryState}
          </button>
        </header>

        <div className="mx-auto   md:w-[675px]  lg:mx-0 xl:w-[700px]">
          {posts &&
            posts.map((post: Posts, index: number) => (
              <Link
                key={post._id}
                to={`/post-list/${post._id}`}
                ref={index + 2 === posts.length ? targetRef : null}
              >
                <PostCard post={post} />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
