import defaultThumbnail from "../../imgs/defaultThumbnail.jpg";
import { useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../store";
import axios from "axios";
import { setThumbnail } from "../../store/write/writeSlice";
import { toast, Toaster } from "react-hot-toast";

const Thumbnail = () => {
  const { thumbnail } = useAppSelector((state) => state.write);

  const dispatch = useAppDispatch();
  const thumbnailRef = useRef();

  const handleThumbnailError = (event: SyntheticEvent<HTMLImageElement>) => {
    let img = event.currentTarget;

    img.src = defaultThumbnail;
  };

  const handleThumbnailFileOpen = () => {
    thumbnailRef.current.click();
  };

  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let thumbnailImage = event?.currentTarget.files[0];

    let formData = new FormData();
    formData.append("image", thumbnailImage);

    axios
      .post(`${import.meta.env.VITE_SERVER_DOMAIN}/image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(({ data }) => {
        let url = `https://image-foundation.s3.ap-northeast-2.amazonaws.com/${data.key}`;
        dispatch(setThumbnail(url));
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.error);
      });
  };

  const handleThumbnailDelete = async () => {
    try {
      let url = thumbnail.split("/");
      let imageKey = url[url.length - 1];

      let data = await axios.delete(
        `${import.meta.env.VITE_SERVER_DOMAIN}/image/${imageKey}`,
      );
      toast.success(data.data);

      dispatch(setThumbnail(""));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div>
      <Toaster />
      <div className="flex justify-end gap-2 opacity-40">
        <p className="cursor-pointer" onClick={handleThumbnailFileOpen}>
          재업로드
        </p>
        <p
          className="cursor-pointer hover:line-through"
          onClick={handleThumbnailDelete}
        >
          삭제
        </p>
      </div>
      <div className="relative mt-2 aspect-video">
        <img
          src={thumbnail.length === 0 ? defaultThumbnail : thumbnail}
          onError={handleThumbnailError}
          onClick={handleThumbnailFileOpen}
          className="ob h-full w-full cursor-pointer"
        />
        {!thumbnail && (
          <p className="absolute left-1/2 top-2/3 -translate-x-1/2 text-sm opacity-70">
            대표 이미지 추가
          </p>
        )}
        <input
          ref={thumbnailRef}
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default Thumbnail;
