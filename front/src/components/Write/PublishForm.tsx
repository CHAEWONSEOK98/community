import axios from "axios";
import { useAppSelector, useAppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  editorStateToggle,
  setThumbnail,
  reset,
} from "../../store/write/writeSlice";
import Thumbnail from "./Thumbnail";
import Title from "./Title";
import Des from "./Des";
import IsPublic from "./IsPublic";
import Tags from "./Tags";
import { Toaster, toast } from "react-hot-toast";

const PublishForm = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const { title, content, thumbnail, des, tags, isPublic, draft, editorState } =
    useAppSelector((state) => state.write);

  const [thumbnailImage, setThumbnailImage] = useState<any>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleBack = () => {
    dispatch(editorStateToggle("editor"));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (thumbnailImage) {
      let formData = new FormData();
      formData.append("image", thumbnailImage);

      axios
        .post(`${import.meta.env.VITE_SERVER_DOMAIN}/image`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(({ data }) => {
          let url = `http://localhost:3000/public/img/${data.key}`;

          let postObject = {
            title,
            content,
            thumbnail: url,
            des,
            tags,
            isPublic,
            draft,
            userId: currentUser?._id,
            username: currentUser?.username,
          };

          dispatch(setThumbnail(url));

          axios
            .post(`${import.meta.env.VITE_SERVER_DOMAIN}/post`, postObject, {
              withCredentials: true,
            })
            .then(() => {
              navigate("/post-list");
              dispatch(reset());
            })
            .catch((error) => {
              console.log(error);
              toast.error(error.response.data.error);
            });
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.error);
        });
    } else {
      let postObject = {
        title,
        content,
        thumbnail,
        des,
        tags,
        isPublic,
        draft,
        userId: currentUser?._id,
        username: currentUser?.username,
      };

      axios
        .post(`${import.meta.env.VITE_SERVER_DOMAIN}/post`, postObject, {
          withCredentials: true,
        })
        .then(() => {
          navigate("/post-list");
          dispatch(reset());
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.error);
        });
    }
  };

  return (
    <section className=" relative  mx-auto h-screen items-center p-4 lg:flex lg:justify-center lg:gap-4">
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <div className=" lg:w-[30%]">
        <p className="text-xl font-bold">미리보기</p>
        <Thumbnail setThumbnailImage={setThumbnailImage} />
        <Title editorState={editorState} />
        <Des />
      </div>

      <div className=" lg:w-[30%]">
        <IsPublic />
        <Tags />

        <form onSubmit={handleSubmit} className="mt-10 flex w-full gap-2">
          <button
            type="button"
            className="w-full  bg-black  py-3 text-sm  text-white hover:bg-opacity-80"
            onClick={handleBack}
          >
            뒤로
          </button>
          <button
            type="submit"
            className="w-full  bg-black  py-3 text-sm  text-white hover:bg-opacity-80"
          >
            등록
          </button>
        </form>
      </div>
    </section>
  );
};

export default PublishForm;
