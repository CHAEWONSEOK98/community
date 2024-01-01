import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import PostCard from "../components/PostCard";
import { useAppDispatch, useAppSelector } from "../store";
import { setTagState } from "../store/tag/tagSlice";

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

const TagsPage = () => {
  const { tagState, tags } = useAppSelector((state) => state.tag);

  const [posts, setPosts] = useState<Posts>([]);
  const [postsUrl, setPostsUrl] = useState(`http://localhost:3000/post/tag`);

  const targetRef = useRef<HTMLAnchorElement>(null);

  const dispatch = useAppDispatch();

  let lastPostId = posts.length > 0 ? posts[posts.length - 1]._id : null;

  const loadMorePosts = (nullLastPostId?: null | string) => {
    if (nullLastPostId === null) {
      setPostsUrl(`http://localhost:3000/post/tag`);
    } else {
      setPostsUrl(`http://localhost:3000/post/tag?lastId=${lastPostId}`);
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.post(`${postsUrl}`, { tagState });
      setPosts((prev) => [...prev, ...data.posts]);
    })();
  }, [postsUrl, tagState]);

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

  const handleTagClick = (tag: string) => {
    if (tagState === tag) return;
    setPosts([]);
    loadMorePosts(null);
    dispatch(setTagState(tag));
  };

  const handleTagTitleClick = () => {
    setPosts([]);
    loadMorePosts(null);
    dispatch(setTagState(""));
  };

  return (
    <div className="flex flex-col items-center px-4">
      <div className="mt-10 w-full md:w-[675px]">
        <p
          className="mb-3 cursor-pointer text-2xl font-bold"
          onClick={handleTagTitleClick}
        >
          Tags {tags && `(${tags.length})`}
        </p>
        <ul className="flex flex-wrap">
          {tags &&
            tags.map((tag, index) => (
              <li
                key={index}
                className={`my-1 mr-2 inline-flex h-7 min-w-max cursor-pointer items-center rounded-3xl border bg-[#F2F2F2] px-3 py-4 text-sm ${
                  tagState === tag[0] ? "border-none bg-black text-white" : ""
                } `}
                onClick={() => handleTagClick(tag[0])}
              >
                {tag[0]} {tag[1] > 0 && `(${tag[1] + 1})`}
              </li>
            ))}
        </ul>
      </div>

      <div className="w-full md:w-[675px]">
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
  );
};

export default TagsPage;
