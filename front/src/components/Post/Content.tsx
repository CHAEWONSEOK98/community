const Img = ({ url, caption }) => {
  return (
    <div className="w-full">
      <img src={url} className="h-96 w-full object-cover" />
      {caption.length ? (
        <p className="my-3 w-full text-center text-base md:mb-12">{caption}</p>
      ) : (
        ""
      )}
    </div>
  );
};

const Content = ({ block }) => {
  let { type, data } = block;

  if (type == "paragraph") {
    return <p>{data.text}</p>;
  }

  if (type == "image") {
    return <Img url={data.file.url} caption={data.caption} />;
  }
};

export default Content;
