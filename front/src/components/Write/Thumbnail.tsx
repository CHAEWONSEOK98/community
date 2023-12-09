import defaultThumbnail from "../../imgs/defaultThumbnail.jpg";
import { useState, useRef } from "react";

const Thumbnail = ({ setThumbnailImage }: any) => {
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");

  const thumbnailRef = useRef();

  const handleThumbnailError = (event: SyntheticEvent<HTMLImageElement>) => {
    let img = event.currentTarget;

    img.src = defaultThumbnail;
  };

  const handleThumbnalilFileOpen = () => {
    thumbnailRef.current.click();
  };

  const handleThumbnailChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let img = event?.currentTarget.files[0];
    setThumbnailImage(img);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(img);
    fileReader.onload = (event) => {
      setThumbnailPreview(event.currentTarget.result);
    };
  };

  return (
    <div className="relative mt-2 aspect-video">
      <img
        src={thumbnailPreview}
        onError={handleThumbnailError}
        onClick={handleThumbnalilFileOpen}
        className="ob h-full w-full cursor-pointer"
      />
      {thumbnailPreview === "" && (
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
  );
};

export default Thumbnail;
