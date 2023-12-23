import { useAppSelector, useAppDispatch } from "../store";
import { useParams } from "react-router-dom";
import { getPost } from "../store/write/writeThunkFunction";

import Editor from "../components/Write/Editor";
import PublishForm from "../components/Write/PublishForm";
import { useEffect } from "react";
import { getCategories } from "../store/category/categoryThunkFunction";

const WritePage = () => {
  const { editorState, loading } = useAppSelector((state) => state.write);

  const { postId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!postId) return;
    dispatch(getPost(postId));
    dispatch(getCategories());
  }, []);

  if (loading) return <p>Loading...</p>;

  return postId ? (
    editorState === "editor" ? (
      <Editor postId={postId} />
    ) : (
      <PublishForm />
    )
  ) : editorState === "editor" ? (
    <Editor />
  ) : (
    <PublishForm />
  );
};

export default WritePage;
